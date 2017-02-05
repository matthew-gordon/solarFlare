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
  return usersReferrals().select();
}

function getSingleUsersReferrals(userReferralID) {
  return usersReferrals().where('id', parseInt(userReferralID)).first();
}

function addUsersReferral(userReferral) {
  return usersReferrals().insert(userReferral, 'id');
}

function updateUsersReferral(userReferralID, updates) {
  return usersReferrals().where('id', parseInt(userReferralID)).update(updates);
}

function deleteUsersReferral(userReferralID) {
  return usersReferrals().where('id', parseInt(userReferralID)).del();
}

// *** GET all users referral queries *** //
function getAllReferralsWithUsersId(userID) {
  return usersReferrals().select().where('user_id', parseInt(userID))
  .join('referrals', 'referrals.id', '=', 'referral_id')
  .select('referrals.name', 'referrals.phone');
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
  getSingleUsersReferrals: getSingleUsersReferrals,
  addUsersReferral: addUsersReferral,
  updateUsersReferral: updateUsersReferral,
  deleteUsersReferral: deleteUsersReferral,
  getAllReferralsWithUsersId: getAllReferralsWithUsersId
};
