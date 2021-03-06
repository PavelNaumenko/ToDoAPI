// const validateUser = (email, password) => {
//   if (!password) {
//     throw new Error('Password must be exist');
//   }
//   if (!email) {
//     throw new Error('Email must be exist');
//   }
//   if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(.\w{2,3})+$/.test(email)) {
//     throw new Error('Invalid email');
//   }
//   return true;
// };
//
// const isValidId = (_id) => {
//   if (!_id) {
//     return true;
//   }
//   if (_id && /^[0-9a-fA-F]{24}$/.test(_id)) {
//     return true;
//   }
//   throw new Error('_id must be a string of 24 hex characters');
// };
//
// const isValidTitle = (title) => {
//   if (!title) {
//     throw new Error('Property title does not exist');
//   }
//   if (typeof title !== 'string') {
//     throw new Error(`title expected string but got ${typeof title}`);
//   }
//   return true;
// };
//
// const isValidCompleted = (completed) => {
//   if (typeof completed !== 'boolean') {
//     throw new Error(`completed expected boolean but got ${typeof completed}`);
//   }
//   return true;
// };
//
// const validateTask = (task) => {
//   const { _id, title, completed = false } = task;
//   try {
//     isValidTitle(title);
//     isValidCompleted(completed);
//     isValidId(_id);
//   } catch (err) {
//     throw err;
//   }
//   return true;
// };
//
// const validateTaskFilter = ({
//   userId, completed, created_at: createdAt, limit = 0, offset = 0,
// }) => {
//   const query = { filter: { userId } };
//   if (completed) {
//     if (completed !== 'true' && completed !== 'false') {
//       throw new Error(`completed expected boolean but got ${typeof completed}`);
//     }
//     query.filter.completed = completed === 'true';
//   }
//   query.sort = 1;
//   if (createdAt) {
//     const ca = parseInt(createdAt, 10);
//     if (Math.abs(ca) !== 1) {
//       throw new Error(`created_at expected 1 or -1 but got ${createdAt}`);
//     }
//     query.sort = ca > 0 ? 1 : -1;
//   }
//   const l = Number(limit);
//   if (Number.isNaN(l)) {
//     throw new Error(`limit expected number but got ${typeof limit}`);
//   }
//   if (l < 0) {
//     throw new Error('limit must be a great than 0');
//   }
//   query.limit = l;
//   const o = Number(offset);
//   if (Number.isNaN(o)) {
//     throw new Error(`limit expected number but got ${typeof offset}`);
//   }
//   if (o < 0) {
//     throw new Error('offset must be a great than 0');
//   }
//   query.offset = o;
//   return query;
// };
//
// const validateEditedTask = (task) => {
//   const result = {};
//   const keys = Object.keys(task);
//   try {
//     keys.every((key) => {
//       if (key !== 'completed' && key !== 'title') {
//         throw new Error(`got unaccepted property ${key}`);
//       }
//       if (key === 'completed' && isValidCompleted(task.completed)) {
//         result.completed = task.completed;
//         return true;
//       }
//       if (key === 'title' && isValidTitle(task.title)) {
//         result.title = task.title;
//         return true;
//       }
//       return false;
//     });
//     return result;
//   } catch (err) {
//     throw err;
//   }
// };
//
//
// module.exports = {
//   validateUser,
//   validateTask,
//   validateTaskFilter,
//   validateEditedTask,
//   isValidId,
// };
