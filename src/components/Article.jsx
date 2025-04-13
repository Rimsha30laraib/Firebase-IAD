
import React, { useState, useEffect } from 'react';
import './App.css'; // Ensure you're importing your CSS

export default function Article({ article, onUpdate, onDelete }) {
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [updatedArticle, setUpdatedArticle] = useState({
    title: article?.title || '',
    body: article?.body || '',
  });

  useEffect(() => {
    // When the article prop changes, reset the updatedArticle to reflect it
    if (article) {
      setUpdatedArticle({
        title: article.title,
        body: article.body,
      });
    }
  }, [article]);

  // Check if title and body are both non-empty to enable the update button
  const isUpdateDisabled = !updatedArticle.title.trim() || !updatedArticle.body.trim();

  const handleUpdate = async () => {
    if (!updatedArticle.title || !updatedArticle.body) return;

    setLoading(true);
    try {
      // Ensure you're passing the correct updated data to onUpdate
      await onUpdate(article.id, updatedArticle);
      setIsEditing(false);  // Exit edit mode after update
    } catch (error) {
      console.error("Error updating article:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this article?");
    if (!confirmDelete) return;

    setLoading(true);
    try {
      // Call delete function passed as a prop
      await onDelete(article.id);
    } catch (error) {
      console.error("Error deleting article:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <article>
      {!article ? (
        <p>No article selected</p>
      ) : (
        <section>
          <h2>{isEditing ? (
            <input
              type="text"
              value={updatedArticle.title}
              onChange={(e) => setUpdatedArticle({ ...updatedArticle, title: e.target.value })}
              placeholder="Edit title"
            />
          ) : (
            article.title
          )}</h2>
          <p className="date">{`Posted: ${article.date}`}</p>
          
          {isEditing ? (
            <>
              <textarea
                value={updatedArticle.body}
                onChange={(e) => setUpdatedArticle({ ...updatedArticle, body: e.target.value })}
                placeholder="Edit body"
              />
              <button onClick={handleUpdate} disabled={isUpdateDisabled}>
                {loading ? 'Updating...' : 'Update'}
              </button>
              <button onClick={() => setIsEditing(false)} disabled={loading}>
                Cancel
              </button>
            </>
          ) : (
            <>
              <p className="body">{article.body}</p>
              <button onClick={() => setIsEditing(true)} disabled={loading}>Edit</button>
              <button onClick={handleDelete} disabled={loading}>Delete</button>
            </>
          )}
        </section>
      )}
    </article>
  );
}
