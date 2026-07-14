import API from "./api";

// =========================
// Get Notes by Category
// =========================

export const getNotesByCategory = async (categoryId) => {

  const response = await API.get(
    `/note/category/${categoryId}`
  );

  return response.data.notes;

};

// =========================
// Create Note
// =========================

export const createNote = async (note) => {

  const response = await API.post(
    "/note",
    note
  );

  return response.data;

};

// =========================
// Delete Note
// =========================

export const deleteNote = async (id) => {

  const response = await API.delete(
    `/note/${id}`
  );

  return response.data;

};

// =========================
// Update Note
// =========================

export const updateNote = async (
  id,
  note
) => {

  const response = await API.put(
    `/note/${id}`,
    note
  );

  return response.data;

};

// =========================
// Get Single Note
// =========================

export const getSingleNote = async (
  id
) => {

  const response = await API.get(
    `/note/${id}`
  );

  return response.data.note;

};


export const togglePinNote = async (id) => {
  try {

    const response = await API.put(`/note/pin/${id}`);

    return response.data;

  } catch (error) {

    throw error;

  }
};