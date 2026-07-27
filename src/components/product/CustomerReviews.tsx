import React from "react";
import { Star, ThumbsUp, Shield, User } from "lucide-react";

const CustomerReviews = () => {
  const reviews = [
    {
      id: 1,
      name: "Alex Johnson",
      avatar: "AJ",
      rating: 5,
      date: "2024-01-15",
      verified: true,
      helpful: 23,
      title: "Excellent gaming performance!",
      content:
        "This laptop exceeded my expectations. The RTX 3060 handles all modern games at high settings with great frame rates. The 144Hz display is smooth and the build quality feels premium. Highly recommended for gaming enthusiasts.",
      images: 2,
    },
    {
      id: 2,
      name: "Sarah Chen",
      avatar: "SC",
      rating: 4,
      date: "2024-01-10",
      verified: true,
      helpful: 18,
      title: "Great laptop, minor heating issues",
      content:
        "Overall very satisfied with this purchase. Performance is outstanding for both gaming and work. The keyboard feels great and the RGB lighting is customizable. Only downside is it can get warm during intensive gaming sessions.",
      images: 0,
    },
    {
      id: 3,
      name: "Mike Rodriguez",
      avatar: "MR",
      rating: 5,
      date: "2024-01-05",
      verified: true,
      helpful: 31,
      title: "Perfect for content creation",
      content:
        "As a video editor, I need powerful hardware that can handle 4K rendering. This laptop delivers excellent performance with the Ryzen 7 and RTX 3060 combo. The display quality is fantastic and color accuracy is impressive.",
      images: 1,
    },
    {
      id: 4,
      name: "Emily Davis",
      avatar: "ED",
      rating: 4,
      date: "2024-01-02",
      verified: false,
      helpful: 12,
      title: "Solid choice for the price",
      content:
        "Good value for money. The performance is reliable and it handles multitasking well. Battery life could be better for non-gaming use, but that's expected with gaming laptops. The design looks sleek and professional.",
      images: 0,
    },
  ];

  const overallRating = 4.5;
  const totalReviews = 324;

  const ratingDistribution = [
    { stars: 5, count: 180, percentage: 56 },
    { stars: 4, count: 98, percentage: 30 },
    { stars: 3, count: 32, percentage: 10 },
    { stars: 2, count: 10, percentage: 3 },
    { stars: 1, count: 4, percentage: 1 },
  ];

  return (
    <div className="bg-white  rounded-lg shadow-sm">
      <div className="border-b border-gray-200 p-6">
        <h3 className="text-xl font-semibold text-[#111827] mb-6">
          Customer Reviews
        </h3>

        {/* Rating Summary */}
        <div className="grid md:grid-cols-2 gap-8 mb-6">
          {/* Overall Rating */}
          <div className="text-center">
            <div className="text-5xl font-bold text-[#111827] mb-2">
              {overallRating}
            </div>
            <div className="flex items-center justify-center space-x-1 mb-2">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-6 w-6 ${
                    i < Math.floor(overallRating)
                      ? "text-[#FFD400] fill-current"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <p className="text-gray-600">Based on {totalReviews} reviews</p>
          </div>

          {/* Rating Distribution */}
          <div className="space-y-2">
            {ratingDistribution.map((item) => (
              <div key={item.stars} className="flex items-center space-x-3">
                <div className="flex items-center space-x-1 w-20">
                  <span className="text-sm font-medium">{item.stars}</span>
                  <Star className="h-4 w-4 text-[#FFD400] fill-current" />
                </div>

                <div className="flex-1 bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-[#FFD400] h-2 rounded-full transition-all duration-300"
                    style={{ width: `${item.percentage}%` }}
                  ></div>
                </div>

                <span className="text-sm text-gray-600 w-12">{item.count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Individual Reviews */}
      <div className="p-6 space-y-6">
        {reviews.map((review) => (
          <div
            key={review.id}
            className="border-b border-gray-100 last:border-b-0 pb-6 last:pb-0"
          >
            <div className="flex items-start space-x-4">
              {/* Avatar */}
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-[#1435C3] text-white rounded-full flex items-center justify-center font-semibold">
                  {review.avatar}
                </div>
              </div>

              {/* Review Content */}
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <h4 className="font-semibold text-[#111827]">
                    {review.name}
                  </h4>
                  {review.verified && (
                    <div className="flex items-center space-x-1 text-[#16A34A] text-sm">
                      <Shield className="h-4 w-4" />
                      <span>Verified Buyer</span>
                    </div>
                  )}
                </div>

                <div className="flex items-center space-x-3 mb-2">
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < review.rating
                            ? "text-[#FFD400] fill-current"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-500">{review.date}</span>
                </div>

                <h5 className="font-semibold text-[#111827] mb-2">
                  {review.title}
                </h5>
                <p className="text-gray-700 mb-3 leading-relaxed">
                  {review.content}
                </p>

                {review.images > 0 && (
                  <div className="flex items-center space-x-2 mb-3">
                    <User className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-500">
                      {review.images} photos attached
                    </span>
                  </div>
                )}

                <div className="flex items-center justify-between text-sm">
                  <button className="flex items-center space-x-1 text-gray-500 hover:text-[#1435C3] transition-colors">
                    <ThumbsUp className="h-4 w-4" />
                    <span>Helpful ({review.helpful})</span>
                  </button>

                  <button className="text-gray-500 hover:text-[#1435C3] transition-colors">
                    Reply
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Load More Button */}
        <div className="text-center pt-4">
          <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-2  rounded-lg  transition-colors">
            Load More Reviews
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomerReviews;

