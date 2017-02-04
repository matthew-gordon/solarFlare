'use strict';

const knex = require('./knex');

function referrals() {
  return knex('referrals');
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

module.exports = {
  getAllReferrals: getAllReferrals,
  getSingleReferral: getSingleReferral,
  addReferral: addReferral,
  updateReferral: updateReferral,
  deleteReferral: deleteReferral
};
