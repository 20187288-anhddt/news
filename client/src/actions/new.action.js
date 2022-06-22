import axios from "axios";

const setNews = (data) => ({
  type: "GET_NEWS",
  payload: data
});


const setSearchNews = (data) => ({
  type: "GET_SEARCH_NEWS",
  payload: data
});

export const getNews = () => {
  return async dispatch => {
    const res = await axios.get("/news/featuredNews");
    const data = res.data.data;

    dispatch(setNews(data));
  };
};


export const getSearchNews = (textSearch) => {
  return async dispatch => {
    const res = await axios.get("/news/q", { params: { textSearch: textSearch } });
    const data = res.data.data;

    dispatch(setSearchNews(data));
  };
};
