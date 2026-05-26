'use client';
import React, { useState, FormEvent } from 'react';
import axios from 'axios';

interface ReviewProps {
  _id?: string;
  userName?: string;
  rating: number;
  comment: string;
  createdAt?: string;
}

interface ReviewSectionProps {
  productId: string;
  reviews: ReviewProps[];
  averageRating: number;
  onReviewSubmitted?: () => void;
}

export default function ReviewSection({ 
  productId, 
  reviews = [], 
  averageRating = 0, 
  onReviewSubmitted 
}: ReviewSectionProps) {
  const [comment, setComment] = useState<string>('');
  const [rating, setRating] = useState<number>(5);
  const [hoveredRating, setHoveredRating] = useState<number>(0);

  const totalReviewsCount = reviews.length;
  const ratingDistribution = [0, 0, 0, 0, 0];

  reviews.forEach(rev => {
    const r = Math.round(rev.rating);
    if (r >= 1 && r <= 5) {
      ratingDistribution[r - 1]++;
    }
  });

  const handleSubmitReview = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    if (!comment.trim()) return;

    try {
      const response = await axios.post(`/api/products/${productId}/reviews`, {
        rating,
        comment
      });

      if (response.status === 201 || response.status === 200) {
        setComment('');
        setRating(5);
        if (onReviewSubmitted) {
          onReviewSubmitted();
        }
      }
    } catch (error: any) {
      console.error('Fulfillment pipeline broke matching request payload structure:', error.response?.data?.error || error.message);
    }
  };

  return (
    <div className="review-section-root">
      <h3 className="review-section-main-heading">Customer Reviews</h3>

      <div className="review-layout-grid">
        <div className="review-summary-metric-card">
          <span className="average-rating-display-value">{averageRating.toFixed(1)}</span>
          <div className="star-icons-flex-row">
            
          </div>
          <p className="total-reviews-meta-text">Based on {totalReviewsCount} ratings</p>
        </div>

        <div className="review-progression-distribution-bars">
          {ratingDistribution.map((count, index) => {
            const currentStarLevel = index + 1;
            const percentage = totalReviewsCount > 0 ? (count / totalReviewsCount) * 100 : 0;

            return (
              <div key={index} className="distribution-bar-row">
                <span className="distribution-label">{currentStarLevel} stars</span>
                <div className="distribution-track-line">
                  <div className="distribution-fill-progress" style={{ width: `${percentage}%` }} />
                </div>
                <span className="distribution-count-label">({count})</span>
              </div>
            );
          }).reverse()}
        </div>

        <div className="review-interactive-form-wrapper">
          <h4 className="form-sub-heading">Write a review</h4>
          <form onSubmit={handleSubmitReview} className="review-vanilla-form">
            
            <div className="form-input-group">
              <label className="form-field-label">Your Rating</label>
              <div className="star-selector-row">
                {Array.from({ length: 5 }).map((_, idx) => {
                  const starValue = idx + 1;
                  const isActive = starValue <= (hoveredRating || rating);
                  return (
                    <button
                      type="button"
                      key={idx}
                      onClick={() => setRating(starValue)}
                      onMouseEnter={() => setHoveredRating(starValue)}
                      onMouseLeave={() => setHoveredRating(0)}
                      className={`star-trigger-btn ${isActive ? 'active-gold' : 'inactive-gray'}`}
                    >
                      
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="form-input-group">
              <label className="form-field-label">Review Message</label>
              <textarea
                rows={3}
                required
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Share details of your experience with this premium product formula..."
                className="vanilla-textarea-box"
              />
            </div>

            <button type="submit" className="form-submit-action-cta">
              Submit Review
            </button>
          </form>
        </div>
      </div>

      <div className="reviews-feed-output-layer">
        {reviews.length === 0 ? (
          <div className="empty-feed-placeholder-wrapper">
           
            <span>No feedback records submitted for this selection layout yet.</span>
          </div>
        ) : (
          reviews.map((rev, index) => (
            <div key={rev._id || index} className="individual-user-review-block">
              <div className="user-review-header-row">
                <div>
                  <h5 className="reviewer-name-label">{rev.userName || 'Verified Shopper'}</h5>
                  <div className="user-rating-stars-row">
                    
                  </div>
                </div>
                <span className="review-timestamp-label">
                  {rev.createdAt ? new Date(rev.createdAt).toLocaleDateString() : 'Recent'}
                </span>
              </div>
              <p className="user-review-text-message">
                {rev.comment}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}