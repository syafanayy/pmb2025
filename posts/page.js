async function getExternalPosts() {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    
    try {
      const response = await fetch(`${baseUrl}/api/external/posts?limit=10`, {
        cache: 'no-store',
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch posts');
      }
      
      return response.json();
    } catch (error) {
      console.error('Error fetching posts:', error);
      return { success: false, data: [], message: error.message };
    }
  }
  
  export default async function PostsPage() {
    const postsResponse = await getExternalPosts();
  
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Blog Posts</h1>
        <p className="text-gray-600 mb-8">Data dari JSONPlaceholder API</p>
        
        {postsResponse.success ? (
          <div className="grid gap-6">
            {postsResponse.data.map((post) => (
              <article key={post.id} className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-2 capitalize">
                  {post.title}
                </h2>
                <p className="text-gray-700">
                  {post.body}
                </p>
                <div className="mt-4 text-sm text-gray-500">
                  Post ID: {post.id} | User ID: {post.userId}
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-red-600">Error: {postsResponse.message}</p>
          </div>
        )}
      </div>
    );
  }