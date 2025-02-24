import React, { useState } from 'react';
import { Card, CardBody, CardHeader, Button, Progress, Textarea, Avatar, Divider } from "@heroui/react";
import { BookOpen, BookMarked, Star, Heart, Share2, MessageCircle } from 'lucide-react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getBookById } from '../../data/book';
import { TApiResponse, TFindBookByIdOutput } from '@book-toshokan/libs/domain';

export const BookPage = () => {
  const params = useParams();
  const bookId = params.bookId || '';

  const { data, isLoading } = useQuery<TApiResponse<TFindBookByIdOutput>>({
    queryKey: ['getBookById', bookId],
    queryFn: () => getBookById(bookId),
  });
  const bookData = data?.body.data;

  const [readingStatus, setReadingStatus] = useState<'to-read' | 'reading' | 'read'>('to-read');
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');

  const bookDetails = {
    title: 'To Kill a Mockingbird',
    description:
      "To Kill a Mockingbird is a novel by Harper Lee published in 1960. It was immediately successful, winning the Pulitzer Prize, and has become a classic of modern American literature. The plot and characters are loosely based on Lee's observations of her family, her neighbors and an event that occurred near her hometown of Monroeville, Alabama, in 1936, when she was 10 years old.",
    image: '/placeholder.svg?height=400&width=300',
    category: {
      name: 'Gothic',
    },
    author: 'Harper Lee',
    publishDate: 'July 11, 1960',
    pages: 281,
    averageRating: 4.27,
    totalRatings: 4829,
    totalReviews: 982,
  };

  const handleStatusChange = (status: 'to-read' | 'reading' | 'read') => {
    setReadingStatus(status);
  };

  const handleRatingChange = (newRating: number) => {
    setRating(newRating);
  };

  if (isLoading) {
    return <p>Loading....</p>;
  }

  return (
    <div className="min-h-screen bg-background text-foreground p-8">
      <div className="max-w-4xl mx-auto">
        {/* <Card className="bg-background/60 border-none">
          <CardBody className="flex flex-col md:flex-row gap-8">
            <div className="md:w-1/3">
              <img
                src={bookDetails.image}
                alt={`${bookDetails.title} cover`}
                className="w-full h-auto rounded-lg shadow-lg"
              />
              <div className="mt-4 flex justify-between">
                <Button
                  color={readingStatus === 'to-read' ? 'primary' : 'default'}
                  variant={readingStatus === 'to-read' ? 'solid' : 'bordered'}
                  onClick={() => handleStatusChange('to-read')}
                >
                  <div>
                    <BookOpen className="w-4 h-4" />
                  </div>
                  To Read
                </Button>
                <Button
                  color={readingStatus === 'reading' ? 'primary' : 'default'}
                  variant={readingStatus === 'reading' ? 'solid' : 'bordered'}
                  onClick={() => handleStatusChange('reading')}
                >
                  <div>
                    <BookMarked className="w-4 h-4" />
                  </div>
                  Reading
                </Button>
                <Button
                  color={readingStatus === 'read' ? 'primary' : 'default'}
                  variant={readingStatus === 'read' ? 'solid' : 'bordered'}
                  onClick={() => handleStatusChange('read')}
                >
                  <div>
                    <Star className="w-4 h-4" />
                  </div>
                  Read
                </Button>
              </div>
            </div>
            <div className="md:w-2/3">
              <h1 className="text-3xl font-bold mb-2">{bookData?.name}</h1>
              <h2 className="text-xl text-default-500 mb-4">by {bookData?.author.name}</h2>
              <div className="flex items-center mb-4">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-5 h-5 ${
                        star <= (bookData?.feedback.averageRating || bookDetails.averageRating)
                          ? 'text-warning fill-warning'
                          : 'text-default-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="ml-2 text-default-500">
                  {bookDetails.averageRating.toFixed(2)} · {bookData?.feedback.totalRatings || 4829} ratings
                </span>
              </div>
              <p className="text-default-500 mb-4">{bookData?.description}</p>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="font-semibold">Published</p>
                  <p className="text-default-500">{bookData?.publishedOn}</p>
                </div>
                <div>
                  <p className="font-semibold">Category</p>
                  <p className="text-default-500">{bookData?.category.name}</p>
                </div>
                <div>
                  <p className="font-semibold">Pages</p>
                  <p className="text-default-500">{bookData?.pages}</p>
                </div>
              </div>
              <div className="flex gap-2 mb-4">
                <Button color="primary" variant="ghost">
                  <Heart className="w-4 h-4 mr-2" />
                  Favorite
                </Button>
                <Button color="primary" variant="ghost">
                  <Share2 className="w-4 h-4 mr-2" />
                  Share
                </Button>
              </div>
            </div>
          </CardBody>
        </Card> */}

        <Card className="mt-8 bg-background/60 border-none">
          <CardHeader>
            <h3 className="text-2xl font-bold">Your Review</h3>
          </CardHeader>
          <CardBody>
            <div className="flex items-center mb-4">
              <span className="mr-2">Your Rating:</span>
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-6 h-6 cursor-pointer ${
                      star <= rating ? 'text-warning fill-warning' : 'text-default-300'
                    }`}
                    onClick={() => handleRatingChange(star)}
                  />
                ))}
              </div>
            </div>
            <Textarea
              placeholder="Write your review here..."
              value={review}
              onChange={(e) => setReview(e.target.value)}
              minRows={3}
              className="mb-4"
            />
            <Button color="primary">Submit Review</Button>
          </CardBody>
        </Card>

        <Card className="mt-8 bg-background/60 border-none">
          <CardHeader>
            <h3 className="text-2xl font-bold">Reading Progress</h3>
          </CardHeader>
          <CardBody>
            <Progress value={60} className="mb-2" color="primary" />
            <p className="text-default-500">You've read 168 of 281 pages (60%)</p>
            <Button color="primary" className="mt-4">
              Update Progress
            </Button>
          </CardBody>
        </Card>

        <Card className="mt-8 bg-background/60 border-none">
          <CardHeader className="flex justify-between items-center">
            <h3 className="text-2xl font-bold">Community Reviews</h3>
            <span className="text-default-500">{bookDetails.totalReviews} reviews</span>
          </CardHeader>
          <CardBody>
            {[1, 2, 3].map((review) => (
              <React.Fragment key={review}>
                <div className="flex items-start mb-4">
                  <Avatar src={`/placeholder.svg?height=40&width=40`} className="mr-4" />
                  <div>
                    <div className="flex items-center mb-1">
                      <h4 className="font-semibold mr-2">User {review}</h4>
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`w-4 h-4 ${star <= 4 ? 'text-warning fill-warning' : 'text-default-300'}`}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-default-500 mb-2">
                      This book is a masterpiece of American literature. The characters are well-developed, and the
                      story is both heartwarming and thought-provoking.
                    </p>
                    <div className="flex items-center text-small text-default-400">
                      <Button size="sm" variant="light">
                        <MessageCircle className="w-4 h-4 mr-1" />
                        Reply
                      </Button>
                      <span className="mx-2">·</span>
                      <span>2 days ago</span>
                    </div>
                  </div>
                </div>
                {review < 3 && <Divider className="my-4" />}
              </React.Fragment>
            ))}
            <Button color="primary" variant="flat" className="mt-4">
              Load More Reviews
            </Button>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};
