import './App.css';
import { useState, useEffect, useCallback, useRef } from 'react';
import { get_posts } from './components/api/endpoints';
import PostList from './components/PostList';

function App() {
  const [posts, setPosts] = useState([]);
  const [nextPage, setNextPage] = useState("/posts");
  const [isLoading, setIsLoading] = useState(false);
  const debounceTimeout = useRef(null);

  const fetchPosts = useCallback(async () => {
    if (isLoading || !nextPage) return;
    setIsLoading(true);
    try {
      const res = await get_posts(nextPage);
      setPosts(prev => [...prev, ...res.data]);
      setNextPage(res.links?.next || null);
    } catch (err) {
      console.error("Failed to fetch posts:", err);
    } finally {
      setIsLoading(false);
    }
  }, [nextPage, isLoading]);

  const getPosts = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await get_posts('/posts');
      setPosts(res.data);
      setNextPage(res.links?.next || null);
    } catch (err) {
      console.error("Failed to fetch initial posts:", err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    getPosts();
  }, [getPosts]);

  useEffect(() => {
    const handleScroll = () => {
      if (debounceTimeout.current) clearTimeout(debounceTimeout.current);
      debounceTimeout.current = setTimeout(() => {
        const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
        if (scrollTop + clientHeight >= scrollHeight - 20) {
          fetchPosts();
        }
      }, 150); // 150ms debounce delay
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (debounceTimeout.current) clearTimeout(debounceTimeout.current);
    };
  }, [fetchPosts]);

  return (
    <div className="App">
      <div className='app-container'>
        <h1 className='title'>Test App</h1>
        <PostList posts={posts} isLoading={isLoading} />
      </div>
    </div>
  );
}

export default App;
