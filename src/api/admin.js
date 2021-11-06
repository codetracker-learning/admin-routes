const adminUIDs = [process.env.REACT_APP_ADMIN_UID1];

const getIsAdmin = (uid) => adminUIDs.includes(uid);

export default getIsAdmin;
