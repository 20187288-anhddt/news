import React,{useEffect} from "react";
import { Link } from "react-router-dom";

    <div>
      <h3 className="mb-3 text-red font-weight">Tin tức mới nhất</h3>
      {
        latest
          ? (
            latest.map((item, index) => {
              let url = `/${hanldeUrlPretty(item.title)}/${item._id}`
              return (
                <Link to={url} key={index} className="latest-new p-1 bg-white rounded text-decoration-none text-dark" target="_blank" rel="noopener noreferrer" >
                  <div className="latest-new__image">
                    <img
                      src={item.content === "" ? item.articlePicture: `/uploads/news/${item.articlePicture}`}
                      alt={item.title}
                    />
                  </div>
                  <div className="latest-new__info">
                    <h5 className="latest-new__title">{item.title}</h5>
                  </div>
                </Link>
              )
            })
          )
          : (<BoxLoadingItem />)
      }
    </div>


