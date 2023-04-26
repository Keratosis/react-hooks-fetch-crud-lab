import React, { useEffect, useState } from "react";
import QuestionItem from "./QuestionItem";

function QuestionList() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/questions")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setData(data);
      });
  }, []);

  function handleDeleteClick(id) {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(() => {
        const updatedData = data.filter((question) => question.id !== id);
        setData(updatedData);
      })
      .catch((error) => {
        console.error("Error deleting question:", error);
      });
  }

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>
        {data.map((question) => (
          <QuestionItem
            key={question.id}
            question={question}
            onDeleteQuestion={handleDeleteClick}
          />
        ))}
      </ul>
    </section>
  );
}

export default QuestionList;