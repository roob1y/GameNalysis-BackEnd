const {
  fetchReview,
  patchReview,
  fetchAllReviews,
  addReview,
  removeReviewById
} = require("../models/reviews.models");

function getReview(req, res, next) {
  const reviewId = req.params.review_id;
  fetchReview(reviewId)
    .then((review) => {
      res.status(200).send({ review });
    })
    .catch((err) => next(err));
}

function patchReviewById(req, res, next) {
  const reviewId = req.params.review_id;
  const incVotes = req.body.inc_votes;
  patchReview(reviewId, incVotes)
    .then((rows) => {
      res.status(200).send({ updatedReview: rows[0] });
    })
    .catch((err) => next(err));
}

function getAllReviews(req, res, next) {
  const { category, sort_by, order, limit, p } = req.query;
  fetchAllReviews(sort_by, order, limit, p, category)
    .then((data) => {
      res.status(200).send({ reviews: data });
    })
    .catch((err) => next(err));
}

function postReview(req, res, next) {
  const reviewData = req.body;
  addReview(reviewData)
    .then((rows) => {
      res.status(201).send({ postedReview: rows });
    })
    .catch((err) => next(err));
}

function deleteReviewById(req, res, next) {
  const {review_id} = req.params
  removeReviewById(review_id).then((rows) => {
      res.status(204).send(rows);
    })
    .catch((err) => next(err));
}



module.exports = { getReview, patchReviewById, getAllReviews, postReview, deleteReviewById };
