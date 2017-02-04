'use strict';

const knex = require('./knex');

function referrals() {
  return knex('referrals');
}

function users() {
  return knex('users');
}

function usersReferrals() {
  return knex('users_referrals');
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

// *** users queries *** //

function getAllUsers() {
  return users().select();
}

function getSingleUser(userID) {
  return users().where('id', parseInt(userID)).first();
}

function addUser(user) {
  return users().insert(user, 'id');
}

function updateUser(userID, updates) {
  return users().where('id', parseInt(userID)).update(updates);
}

function deleteUser(userID) {
  return users().where('id', parseInt(userID)).del();
}

// *** users referrals queries *** //

function getAllUsersReferrals() {
  return users().select();
}

function getSingleUsersReferral(userReferralID) {
  return users().where('id', parseInt(userReferralID)).first();
}

function addUsersReferral(userReferral) {
  return users().insert(userReferral, 'id');
}

function updateUsersReferral(userReferralID, updates) {
  return users().where('id', parseInt(userReferralID)).update(updates);
}

function deleteUsersReferral(userReferralID) {
  return users().where('id', parseInt(userReferralID)).del();
}

function getAllReferralsWithUsersId() {
  return usersRef()
    .join('users', 'messages.user_id', '=', 'users.id')
    .select('messages.content', 'users.username', 'messages.created_at');
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
  deleteUser: deleteUser,
  getAllUsersReferrals: getAllUsersReferrals,
  getSingleUsesrReferral: getSingleUsersReferral,
  addUsersReferral: addUsersReferral,
  updateUsersReferral: updateUsersReferral,
  deleteUsersReferral: deleteUsersReferral
};
