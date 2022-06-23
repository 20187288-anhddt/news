import React, {useState, useEffect } from "react";
import { Link } from "react-router-dom";

import BoxLoadingItem from "../../BoxLoadingItem";
import { hanldeUrlPretty } from "../../mixin/UrlPretty";

export default function HightlightedNews({news}) {
  return (
    <div>
      <h3 className="mb-3 text-red font-weight">Tin tức nổi bật</h3>
      {news ? (
        <Link
          to={`/${news.title && hanldeUrlPretty(news.title)}/${news._id}`}
          className="featured-new p-3 bg-white rounded text-decoration-none"
        >
          {news.articlePicture ? (
            <div className="featured-new__image border border-secondary">
              <img
                src={news.content === "" ? news.articlePicture: `/uploads/news/${news.articlePicture}`}
                alt={news.title}
              />
            </div>
          ) : (<BoxLoadingItem />)}
          <div className="featured-new__info">
            <h4 className="featured-new__title">{news.title}</h4>
          </div>
        </Link>
      ) : (
        <p className="text-secondary">Chưa có tin nào</p>
      )}
    </div>
  );
}
