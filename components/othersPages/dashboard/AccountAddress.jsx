'use client';

import { useEffect, useMemo, useState } from 'react';
import { fetchSavedAddresses, createSavedAddress, deleteSavedAddress, updateSavedAddress } from '@/src/lib/api';

export default function AccountAddress() {
  const [activeEdit, setactiveEdit] = useState(false); // Add form open
  const [activeAdd, setactiveAdd] = useState(false); // Edit form open

  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);

  const [savingNew, setSavingNew] = useState(false);
  const [savingEdit, setSavingEdit] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [defaultingId, setDefaultingId] = useState(null);

  const [err, setErr] = useState('');
  const [msg, setMsg] = useState('');

  const [editingId, setEditingId] = useState(null);

  // -----------------------------
  // Form states (UI preserved)
  // -----------------------------
  const [newForm, setNewForm] = useState({
    firstname: '',
    lastname: '',
    email: '',
    address: '',
    city: '',
    country: 'Sri Lanka',
    zip: '',
    phone: '',
    is_default: true,
    type: 'billing',
  });

  const [editForm, setEditForm] = useState({
    firstname: '',
    lastname: '',
    email: '',
    address: '',
    city: '',
    country: 'Sri Lanka',
    province: '',
    zip: '',
    phone: '',
    is_default: true,
    type: 'billing',
  });

  const loadAddresses = async () => {
    setErr('');
    setMsg('');
    setLoading(true);
    try {
      const data = await fetchSavedAddresses();
      setAddresses(Array.isArray(data) ? data : []);
    } catch (e) {
      setErr(e?.message || 'Failed to load addresses');
      setAddresses([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAddresses();
  }, []);

  // default first
  const sortedAddresses = useMemo(() => {
    const copy = [...addresses];
    copy.sort((a, b) => {
      const ad = a.is_default ? 1 : 0;
      const bd = b.is_default ? 1 : 0;
      if (bd !== ad) return bd - ad;
      return (b.id || 0) - (a.id || 0);
    });
    return copy;
  }, [addresses]);

  const splitName = (full) => {
    const s = String(full || '').trim();
    if (!s) return { first: '', last: '' };
    const parts = s.split(' ');
    const first = parts.shift() || '';
    const last = parts.join(' ');
    return { first, last };
  };

  const openEditForm = (addr) => {
    if (!addr?.id) return;

    const { first, last } = splitName(addr.name);

    setEditingId(addr.id);
    setEditForm({
      firstname: first,
      lastname: last,
      email: addr.email || '',
      address: addr.address_line || '',
      city: addr.city || '',
      country: addr.country || 'Sri Lanka',
      province: addr.state || '',
      zip: addr.postal_code || '',
      phone: addr.phone || '',
      is_default: !!addr.is_default,
      type: addr.type || 'billing',
    });

    setactiveAdd(true);
  };

  const resetNewForm = () => {
    setNewForm({
      firstname: '',
      lastname: '',
      email: '',
      address: '',
      city: '',
      country: 'Sri Lanka',
      zip: '',
      phone: '',
      is_default: true,
      type: 'billing',
    });
  };

  // helper: build payload that Laravel validation expects
  const addressToPayload = (addr, overrides = {}) => {
    return {
      type: overrides.type ?? addr.type ?? 'billing',
      name: overrides.name ?? addr.name ?? '',
      email: overrides.email ?? addr.email ?? null,
      phone: overrides.phone ?? addr.phone ?? null,
      address_line: overrides.address_line ?? addr.address_line ?? '',
      city: overrides.city ?? addr.city ?? '',
      state: overrides.state ?? addr.state ?? null,
      postal_code: overrides.postal_code ?? addr.postal_code ?? '',
      country: overrides.country ?? addr.country ?? '',
      is_default: overrides.is_default ?? !!addr.is_default,
    };
  };

  // -----------------------------
  // Create
  // -----------------------------
  const submitNew = async (e) => {
    e.preventDefault();
    setErr('');
    setMsg('');
    setSavingNew(true);

    try {
      const name = `${newForm.firstname} ${newForm.lastname}`.trim();

      await createSavedAddress({
        type: newForm.type,
        name,
        email: newForm.email || null,
        phone: newForm.phone || null,
        address_line: newForm.address,
        city: newForm.city,
        state: null,
        postal_code: newForm.zip,
        country: newForm.country,
        is_default: !!newForm.is_default,
      });

      setMsg('Address added.');
      setactiveEdit(false);
      resetNewForm();
      await loadAddresses();
    } catch (e2) {
      setErr(e2?.message || 'Failed to add address');
    } finally {
      setSavingNew(false);
    }
  };

  // -----------------------------
  // Update
  // -----------------------------
  const submitEdit = async (e) => {
    e.preventDefault();
    if (!editingId) return;

    setErr('');
    setMsg('');
    setSavingEdit(true);

    try {
      const name = `${editForm.firstname} ${editForm.lastname}`.trim();

      await updateSavedAddress(editingId, {
        type: editForm.type,
        name,
        email: editForm.email || null,
        phone: editForm.phone || null,
        address_line: editForm.address,
        city: editForm.city,
        state: editForm.province || null,
        postal_code: editForm.zip,
        country: editForm.country,
        is_default: !!editForm.is_default,
      });

      setMsg('Address updated.');
      setactiveAdd(false);
      setEditingId(null);
      await loadAddresses();
    } catch (e2) {
      setErr(e2?.message || 'Failed to update address');
    } finally {
      setSavingEdit(false);
    }
  };

  // -----------------------------
  // Make Default (NEW)
  // -----------------------------
  const handleMakeDefault = async (addr) => {
    if (!addr?.id) return;
    if (addr.is_default) return;

    setErr('');
    setMsg('');
    setDefaultingId(addr.id);

    try {
      // send full payload (required fields)
      const payload = addressToPayload(addr, { is_default: true });

      await updateSavedAddress(addr.id, payload);

      setMsg('Default address updated.');
      await loadAddresses();
    } catch (e) {
      setErr(e?.message || 'Failed to set default address');
    } finally {
      setDefaultingId(null);
    }
  };

  // -----------------------------
  // Delete
  // -----------------------------
  const handleDelete = async (addr) => {
    if (!addr?.id) return;
    if (!confirm('Delete this address?')) return;

    setErr('');
    setMsg('');
    setDeletingId(addr.id);

    try {
      await deleteSavedAddress(addr.id);
      setMsg('Address deleted.');

      if (editingId === addr.id) {
        setactiveAdd(false);
        setEditingId(null);
      }

      await loadAddresses();
    } catch (e) {
      setErr(e?.message || 'Failed to delete address');
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="my-account-content account-address">
      <div className="text-center widget-inner-address">
        {err ? <div style={{ color: 'red', marginBottom: 10 }}>{err}</div> : null}
        {msg ? <div style={{ color: 'green', marginBottom: 10 }}>{msg}</div> : null}

        <button className="tf-btn btn-fill animate-hover-btn btn-address mb_20" onClick={() => setactiveEdit(true)}>
          Add a new address
        </button>

        {/* ADD FORM (company removed, email added) */}
        <form
          className="show-form-address wd-form-address"
          id="formnewAddress"
          onSubmit={submitNew}
          style={activeEdit ? { display: 'block' } : { display: 'none' }}>
          <div className="title">Add a new address</div>

          <div className="box-field grid-2-lg">
            <div className="tf-field style-1">
              <input
                className="tf-field-input tf-input"
                placeholder=" "
                type="text"
                id="firstname"
                name="first name"
                value={newForm.firstname}
                onChange={(e) => setNewForm((p) => ({ ...p, firstname: e.target.value }))}
              />
              <label className="tf-field-label fw-4 text_black-2" htmlFor="firstname">
                First name
              </label>
            </div>

            <div className="tf-field style-1">
              <input
                className="tf-field-input tf-input"
                placeholder=" "
                type="text"
                id="lastname"
                name="last name"
                value={newForm.lastname}
                onChange={(e) => setNewForm((p) => ({ ...p, lastname: e.target.value }))}
              />
              <label className="tf-field-label fw-4 text_black-2" htmlFor="lastname">
                Last name
              </label>
            </div>
          </div>

          {/* Email */}
          <div className="box-field">
            <div className="tf-field style-1">
              <input
                className="tf-field-input tf-input"
                placeholder=" "
                type="email"
                id="emailNew"
                name="email"
                value={newForm.email}
                onChange={(e) => setNewForm((p) => ({ ...p, email: e.target.value }))}
              />
              <label className="tf-field-label fw-4 text_black-2" htmlFor="emailNew">
                Email
              </label>
            </div>
          </div>

          <div className="box-field">
            <div className="tf-field style-1">
              <input
                className="tf-field-input tf-input"
                placeholder=" "
                type="text"
                id="address"
                name="address"
                value={newForm.address}
                onChange={(e) => setNewForm((p) => ({ ...p, address: e.target.value }))}
              />
              <label className="tf-field-label fw-4 text_black-2" htmlFor="address">
                Address
              </label>
            </div>
          </div>

          <div className="box-field">
            <div className="tf-field style-1">
              <input
                className="tf-field-input tf-input"
                placeholder=" "
                type="text"
                id="city"
                name="city"
                value={newForm.city}
                onChange={(e) => setNewForm((p) => ({ ...p, city: e.target.value }))}
              />
              <label className="tf-field-label fw-4 text_black-2" htmlFor="city">
                City
              </label>
            </div>
          </div>

          <div className="box-field">
            <label htmlFor="country" className="mb_10 fw-4 text-start d-block text_black-2 ">
              Country/Region
            </label>
            <div className="select-custom">
              <select
                className="tf-select w-100"
                id="country"
                name="address[country]"
                data-default=""
                value={newForm.country}
                onChange={(e) => setNewForm((p) => ({ ...p, country: e.target.value }))}>
                <option value="---" data-provinces="[]">
                  ---
                </option>
                <option value="Sri Lanka" data-provinces="[]">
                  Sri lanka
                </option>
              </select>
            </div>
          </div>

          <div className="box-field">
            <div className="tf-field style-1">
              <input
                className="tf-field-input tf-input"
                placeholder=" "
                type="text"
                id="AddressZipNew"
                name="AddressZipNew"
                value={newForm.zip}
                onChange={(e) => setNewForm((p) => ({ ...p, zip: e.target.value }))}
              />
              <label className="tf-field-label fw-4 text_black-2" htmlFor="AddressZipNew">
                Postal/ZIP code
              </label>
            </div>
          </div>

          <div className="box-field">
            <div className="tf-field style-1">
              <input
                className="tf-field-input tf-input"
                placeholder=" "
                type="text"
                id="phone"
                name="phone"
                value={newForm.phone}
                onChange={(e) => setNewForm((p) => ({ ...p, phone: e.target.value }))}
              />
              <label className="tf-field-label fw-4 text_black-2" htmlFor="phone">
                Phone
              </label>
            </div>
          </div>

          <div className="box-field text-start">
            <div className="box-checkbox fieldset-radio d-flex align-items-center gap-8">
              <input
                type="checkbox"
                id="check-new-address"
                className="tf-check"
                checked={!!newForm.is_default}
                onChange={(e) => setNewForm((p) => ({ ...p, is_default: e.target.checked }))}
              />
              <label htmlFor="check-new-address" className="text_black-2 fw-4">
                Set as default address.
              </label>
            </div>
          </div>

          <div className="d-flex align-items-center justify-content-center gap-20">
            <button type="submit" className="tf-btn btn-fill animate-hover-btn" disabled={savingNew}>
              {savingNew ? 'Saving...' : 'Add address'}
            </button>
            <span className="tf-btn btn-fill animate-hover-btn btn-hide-address" onClick={() => setactiveEdit(false)}>
              Cancel
            </span>
          </div>
        </form>

        {/* ALL addresses */}
        {loading ? (
          <p>Loading...</p>
        ) : !sortedAddresses.length ? (
          <>
            <h6 className="mb_20">Default</h6>
            <p>No saved address yet.</p>
          </>
        ) : (
          <>
            {sortedAddresses.map((addr, idx) => (
              <div key={addr.id} style={{ marginTop: idx === 0 ? 0 : 24 }}>
                <h6 className="mb_20">{addr.is_default ? 'Default' : 'Address'}</h6>

                <p>{addr.name}</p>
                <p>{addr.address_line}</p>
                <p>{addr.city}</p>
                <p>{addr.email || ''}</p>
                <p className="mb_10">{addr.phone || ''}</p>

                <div className="d-flex gap-10 justify-content-center">
                  <button
                    className="tf-btn btn-fill animate-hover-btn justify-content-center btn-edit-address"
                    onClick={() => openEditForm(addr)}>
                    <span>Edit</span>
                  </button>

                  {/* ✅ Make Default (only if not default) */}
                  {!addr.is_default ? (
                    <button
                      className="tf-btn btn-outline animate-hover-btn justify-content-center"
                      onClick={() => handleMakeDefault(addr)}
                      disabled={defaultingId === addr.id}>
                      <span>{defaultingId === addr.id ? 'Updating...' : 'Make Default'}</span>
                    </button>
                  ) : null}

                  <button
                    className="tf-btn btn-outline animate-hover-btn justify-content-center"
                    onClick={() => handleDelete(addr)}
                    disabled={deletingId === addr.id}>
                    <span>{deletingId === addr.id ? 'Deleting...' : 'Delete'}</span>
                  </button>
                </div>
              </div>
            ))}
          </>
        )}

        {/* EDIT FORM */}
        <form
          className="edit-form-address wd-form-address"
          id="formeditAddress"
          onSubmit={submitEdit}
          style={activeAdd ? { display: 'block' } : { display: 'none' }}>
          <div className="title">Edit address</div>

          <div className="box-field grid-2-lg">
            <div className="tf-field style-1">
              <input
                className="tf-field-input tf-input"
                placeholder=" "
                type="text"
                id="firstnameEdit"
                name="first name"
                value={editForm.firstname}
                onChange={(e) => setEditForm((p) => ({ ...p, firstname: e.target.value }))}
              />
              <label className="tf-field-label fw-4 text_black-2" htmlFor="firstnameEdit">
                First name
              </label>
            </div>

            <div className="tf-field style-1">
              <input
                className="tf-field-input tf-input"
                placeholder=" "
                type="text"
                id="lastnameEdit"
                name="last name"
                value={editForm.lastname}
                onChange={(e) => setEditForm((p) => ({ ...p, lastname: e.target.value }))}
              />
              <label className="tf-field-label fw-4 text_black-2" htmlFor="lastnameEdit">
                Last name
              </label>
            </div>
          </div>

          {/* Email */}
          <div className="box-field">
            <div className="tf-field style-1">
              <input
                className="tf-field-input tf-input"
                placeholder=" "
                type="email"
                id="emailEdit"
                name="email"
                value={editForm.email}
                onChange={(e) => setEditForm((p) => ({ ...p, email: e.target.value }))}
              />
              <label className="tf-field-label fw-4 text_black-2" htmlFor="emailEdit">
                Email
              </label>
            </div>
          </div>

          <div className="box-field">
            <div className="tf-field style-1">
              <input
                className="tf-field-input tf-input"
                placeholder=" "
                type="text"
                id="addressEdit"
                name="address"
                value={editForm.address}
                onChange={(e) => setEditForm((p) => ({ ...p, address: e.target.value }))}
              />
              <label className="tf-field-label fw-4 text_black-2" htmlFor="addressEdit">
                Address
              </label>
            </div>
          </div>

          <div className="box-field">
            <div className="tf-field style-1">
              <input
                className="tf-field-input tf-input"
                placeholder=" "
                type="text"
                id="cityEdit"
                name="city"
                value={editForm.city}
                onChange={(e) => setEditForm((p) => ({ ...p, city: e.target.value }))}
              />
              <label className="tf-field-label fw-4 text_black-2" htmlFor="cityEdit">
                City
              </label>
            </div>
          </div>

          <div className="box-field">
            <label htmlFor="countryEdit" className="mb_10 fw-4 text-start d-block text_black-2">
              Country/Region
            </label>
            <div className="select-custom">
              <select
                className="tf-select w-100"
                id="countryEdit"
                name="address[country]"
                data-default=""
                value={editForm.country}
                onChange={(e) => setEditForm((p) => ({ ...p, country: e.target.value }))}>
                <option value="---" data-provinces="[]">
                  ---
                </option>
                <option value="Sri Lanka" data-provinces="[]">
                  Sri Lanka
                </option>
              </select>
            </div>
          </div>

          <div className="box-field">
            <div className="tf-field style-1">
              <input
                className="tf-field-input tf-input"
                placeholder=" "
                type="text"
                id="province"
                name="province"
                value={editForm.province}
                onChange={(e) => setEditForm((p) => ({ ...p, province: e.target.value }))}
              />
              <label className="tf-field-label fw-4 text_black-2" htmlFor="province">
                Province
              </label>
            </div>
          </div>

          <div className="box-field">
            <div className="tf-field style-1">
              <input
                className="tf-field-input tf-input"
                placeholder=" "
                type="text"
                id="AddressZipNewEdit"
                name="AddressZipNew"
                value={editForm.zip}
                onChange={(e) => setEditForm((p) => ({ ...p, zip: e.target.value }))}
              />
              <label className="tf-field-label fw-4 text_black-2" htmlFor="AddressZipNewEdit">
                Postal/ZIP code
              </label>
            </div>
          </div>

          <div className="box-field">
            <div className="tf-field style-1">
              <input
                className="tf-field-input tf-input"
                placeholder=" "
                type="text"
                id="phoneEdit"
                name="phone"
                value={editForm.phone}
                onChange={(e) => setEditForm((p) => ({ ...p, phone: e.target.value }))}
              />
              <label className="tf-field-label fw-4 text_black-2" htmlFor="phoneEdit">
                Phone
              </label>
            </div>
          </div>

          <div className="box-field text-start">
            <div className="box-checkbox fieldset-radio d-flex align-items-center gap-8">
              <input
                type="checkbox"
                id="check-edit-address"
                className="tf-check"
                checked={!!editForm.is_default}
                onChange={(e) => setEditForm((p) => ({ ...p, is_default: e.target.checked }))}
              />
              <label htmlFor="check-edit-address" className="text_black-2 fw-4">
                Set as default address.
              </label>
            </div>
          </div>

          <div className="d-flex align-items-center justify-content-center gap-20">
            <button type="submit" className="tf-btn btn-fill animate-hover-btn" disabled={savingEdit}>
              {savingEdit ? 'Saving...' : 'Update address'}
            </button>
            <span
              className="tf-btn btn-fill animate-hover-btn btn-hide-edit-address"
              onClick={() => {
                setactiveAdd(false);
                setEditingId(null);
              }}>
              Cancel
            </span>
          </div>
        </form>
      </div>
    </div>
  );
}
