import ImageSlider from "./components/carousel"

export default function Home() {
  const images = [
    "https://img.freepik.com/free-photo/painting-mountain-lake-with-mountain-background_188544-9126.jpg",
    "https://piktochart.com/wp-content/uploads/2023/04/large-29.jpg",
    "https://i.pinimg.com/originals/2b/66/01/2b66016d5a1e2d230ecce59f8e673382.png",
    "https://i.pinimg.com/736x/5f/09/47/5f0947219a7f446e804e7e0055089fad.jpg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRoKMpEfmuwzKmwyl4reX0NW7-Ixgn1DCz6IvxSYpq_CQ&s",
    "https://img.freepik.com/free-photo/space-background-realistic-starry-night-cosmos-sky_1048-11632.jpg",
    "https://img.freepik.com/free-photo/beautiful-view-greenery-bridge-forest-perfect-background_181624-17827.jpg",
    "https://img.freepik.com/free-photo/lone-tree_181624-46361.jpg",
  ]

  return (
    <main className="min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Custom Image Slider</h1>

      <section>
        <div className="max-w-4xl mx-auto">
          <ImageSlider images={images} />
        </div>
        <h2 className="text-2xl font-semibold mb-4 text-center">Basic Slider (Default Settings)</h2>
      </section>

      <section className="mt-10">  
        <div className="max-w-4xl mx-auto">
          <ImageSlider
            images={images}
            settings={{
              slidesToShow: 3,
              slidesToScroll: 1,
            }}
          />
        </div>
        <h2 className="text-2xl font-semibold mb-4 text-center">Multiple Slides (3 at once)</h2>
      </section>

      <section className="mb-12">
        <div className="max-w-4xl mx-auto">
          <ImageSlider
            images={images}
            settings={{
              slidesToShow: 4,
              slidesToScroll: 2,
              dots: true,
            }}
          />
        </div>
        <h2 className="text-2xl font-semibold mb-4 text-center">Scroll Multiple (2 slides at a time)</h2>
      </section>

      <section className="mb-12">
        <div className="max-w-4xl mx-auto">
          <ImageSlider
            images={images}
            settings={{
              slidesToShow: 1,
              centerMode: true,
              centerPadding: "100px",
            }}
          />
        </div>
        <h2 className="text-2xl font-semibold mb-4 text-center">Center Mode</h2>
      </section>

      <section className="mb-12">
        <div className="max-w-4xl mx-auto">
          <ImageSlider
            images={images}
            settings={{
              slidesToShow: 3,
              slidesToScroll: 1,
              responsive: [
                {
                  breakpoint: 1024,
                  settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                  },
                },
                {
                  breakpoint: 640,
                  settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                  },
                },
              ],
            }}
          />
        </div>
        <h2 className="text-2xl font-semibold mb-4 text-center">Responsive Settings</h2>
      </section>
    </main>
  )
}
