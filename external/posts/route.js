export async function GET(request) {
    try {
      const { searchParams } = new URL(request.url);
      const limit = searchParams.get('limit') || '10';
      
      const response = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=${limit}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch data from external API');
      }
  
      const posts = await response.json();
  
      return NextResponse.json({
        success: true,
        data: posts,
        total: posts.length,
        message: "Data posts berhasil diambil dari API eksternal",
        source: "JSONPlaceholder API"
      });
    } catch (error) {
      return NextResponse.json({
        success: false,
        message: "Gagal mengambil data dari API eksternal",
        error: error.message
      }, { status: 500 });
    }
  }