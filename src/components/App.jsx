import { useEffect, useState } from "react";
import Nav from "./Nav";
import Article from "./Article";
import ArticleEntry from "./ArticleEntry";
import { fetchArticles, createArticle, updateArticle, deleteArticle } from "../services/articleService"; // Import deleteArticle
import "./App.css";
import { useAuthentication } from "../services/authService";
import { Signin, SignOut } from "./Auth";

export default function App() {
    const [articles, setArticles] = useState([]);
    const [article, setArticle] = useState(null);
    const [writing, setWriting] = useState(null);
    const user = useAuthentication();

    // Fetch articles when the user is authenticated
    useEffect(() => {
        if (user) {
            fetchArticles().then(setArticles);
        }
    }, [user]);

    // Add a new article
    function addArticle({ title, body }) {
        createArticle({ title, body }).then((article) => {
            setArticle(article);
            setArticles([article, ...articles]);
            setWriting(false);
        });
    }
    const handleUpdateArticle = async (id, updatedData) => {
        try {
            // Add a new timestamp to indicate the article was updated
            const updatedArticle = {
                ...updatedData,
                timestamp: new Date().toISOString(),  // Adding timestamp to the update
            };
    
            // Call the updateArticle service function and pass the updated data with the timestamp
            const updatedArticleFromFirestore = await updateArticle(id, updatedArticle);
    
            // Update the article in state, including the new timestamp
            setArticles((prevArticles) =>
                prevArticles.map((article) =>
                    article.id === id ? { ...article, ...updatedArticleFromFirestore } : article
                )
            );
            setArticle(updatedArticleFromFirestore); // Update the selected article too
        } catch (error) {
            console.error("Error updating article:", error);
        }
    };
    
    // Delete article handler
    const handleDeleteArticle = async (id) => {
        try {
            // Call the deleteArticle function from articleService to remove from Firestore
            await deleteArticle(id); // Pass the ID to delete the article from Firestore

            // Update state to remove the deleted article from the list
            setArticles((prevArticles) =>
                prevArticles.filter((article) => article.id !== id)
            );
            setArticle(null); // Clear the selected article after deletion
        } catch (error) {
            console.error("Error deleting article:", error);
        }
    };

    return (
        <div className="App">
            <header>
                Blog
                {user && <button onClick={() => setWriting(true)}>New Article</button>}
                {!user ? <Signin /> : <SignOut />}
            </header>

            {!user ? "" : <Nav articles={articles} setArticle={setArticle} />}

            {!user ? (
                ""
            ) : writing ? (
                <ArticleEntry addArticle={addArticle} />
            ) : (
                <Article
                    article={article}
                    onUpdate={handleUpdateArticle}
                    onDelete={handleDeleteArticle}
                />
            )}
        </div>
    );
}
