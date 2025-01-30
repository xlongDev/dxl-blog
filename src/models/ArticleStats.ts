import mongoose from "mongoose";

const ArticleStatsSchema = new mongoose.Schema(
  {
    slug: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    views: {
      type: Number,
      default: 0,
    },
    likes: {
      type: Number,
      default: 0,
    },
    likedBy: [
      {
        type: String,
      },
    ],
    lastViewedAt: {
      type: Date,
      default: Date.now,
    },
    lastLikedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

// 添加并发控制
ArticleStatsSchema.index({ slug: 1, lastViewedAt: 1 });
ArticleStatsSchema.index({ slug: 1, lastLikedAt: 1 });

// 添加乐观锁
ArticleStatsSchema.pre("save", function (next) {
  this.increment();
  next();
});

// 创建或获取模型
export const ArticleStats =
  mongoose.models.ArticleStats ||
  mongoose.model("ArticleStats", ArticleStatsSchema);
