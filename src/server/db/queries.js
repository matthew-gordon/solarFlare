'use strict';

const knex = require('./knex');

function referrals() {
  return knex('referrals');
}

function users() {
  return knex('users');
}

// *** referrals queries *** //

function getAllReferrals() {
  return referrals().select();
}

function getSingleReferral(referralID) {
  return referrals().where('id', parseInt(referralID)).first();
}

function addReferral(referral) {
  return referrals().insert(referral, 'id');
}

function updateReferral(referralID, updates) {
  return referrals().where('id', parseInt(referralID)).update(updates);
}

function deleteReferral(referralID) {
  return referrals().where('id', parseInt(referralID)).del();
}

// function getAllMessagesWithUsernames() {
//   return messages()
//     .join('users', 'messages.user_id', '=', 'users.id')
//     .select('messages.content', 'users.username', 'messages.created_at');
// }

// *** users queries *** //

function getAllUsers() {
  return users().select();
}

function getSingleUser(userID) {
  return users().where('id', parseInt(userID)).first();
}

function addUser(referral) {
  return users().insert(referral, 'id');
}

function updateUser(userID, updates) {
  return users().where('id', parseInt(userID)).update(updates);
}

function deleteUser(userID) {
  return users().where('id', parseInt(userID)).del();
}


module.exports = {
  getAllReferrals: getAllReferrals,
  getSingleReferral: getSingleReferral,
  addReferral: addReferral,
  updateReferral: updateReferral,
  deleteReferral: deleteReferral,
  getAllUsers: getAllUsers,
  getSingleUser: getSingleUser,
  addUser: addUser,
  updateUser: updateUser,
  deleteUser: deleteUser
};
