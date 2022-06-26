import React from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

import { setMessage } from "../../../../actions/message.action";

export default function EditNews({ match }) {
  const [content, setContent] = React.useState(null);
  const [tagAlready, setTagAlready] = React.useState("");
  const [tags, setTags] = React.useState([]);
  const [file, setFile] = React.useState(null);
  const [categories, setCategories] = React.useState([]);
  const [newData, setNewData] = React.useState([]);


  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(setMessage({ message: "" }));

    const fetchCategories = async () => {
      const res = await axios.get("/cateNews");
      const data = res.data.data;

      setCategories(data);
    };

    const fetchNew = async () => {
      const res = await axios.get(`/news/new/${match.params.id}`);
      const data = res.data.data[0];
      setNewData(data);
      setTags(data.tag);
    };

    fetchCategories();
    fetchNew();
  }, [dispatch, match.params.id]);

}