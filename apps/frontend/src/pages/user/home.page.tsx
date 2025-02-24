import { Link, Button, Card, CardHeader, CardBody, CardFooter, Image } from "@heroui/react";
import { BookOpen, Star } from 'lucide-react';
import { keyFeatures } from '../../constants/key-features';
import { readingStatuses } from '../../constants/reading-status';
import { useQuery } from '@tanstack/react-query';
import { getRecommendedBooks } from '../../data/book';
// import { TGetRecommendedBooks } from '../../data/contracts/book/schema';
import { useNavigate } from 'react-router-dom';
import { getAppsPath } from '../../utils/getAppsPath';
import { FormEvent, useState } from 'react';

const Welcome = () => {
  const navigate = useNavigate();
  const { feedPage } = getAppsPath();

  return (
    <section className="w-full md:my-40 py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-b from-background to-background/80 flex justify-center items-center">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
              Welcome to Book-Toshokan
            </h1>
            <p className="mx-auto max-w-[700px] text-gray-600 dark:text-white md:text-xl">
              Your personal book library manager. Catalog, track, and review your reading journey.
            </p>
          </div>
          <div className="space-x-4">
            <Button color="primary" size="lg" onClick={() => navigate(feedPage)}>
              Get Started
            </Button>
            <Button variant="bordered" size="lg">
              Learn More
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

const KeyFeatures = () => {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-[#f3f4f6] dark:bg-background/50 flex justify-center items-center">
      <div className="container px-4 md:px-6">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
          Key Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {keyFeatures.map((feature) => {
            return (
              <div
                key={feature.id}
                className="flex flex-col items-center text-center p-6 bg-background/80 rounded-xl shadow-lg transition-all hover:shadow-xl"
              >
                {feature.icon}
                <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">{feature.name}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

const ReadingStatus = () => {
  return (
    <section className="w-full py-12 md:py-24 bg-[#f3f4f6] dark:bg-background/50 lg:py-32 flex items-center justify-center">
      <div className="container px-4 md:px-6">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-10 bg-clip-text pb-2 text-transparent bg-gradient-to-r from-primary to-secondary">
          Manage Your Reading Status
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {readingStatuses.map((status) => {
            return (
              <div
                key={status.id}
                className="flex flex-col items-center p-6 bg-background/80 rounded-xl shadow-lg transition-all hover:shadow-xl"
              >
                {status.icon}
                <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">{status.name}</h3>
                <p className="text-center text-gray-400">{status.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

// const RecommendedBooks = () => {
//   const { data: recommendedBooksData } = useQuery<TGetRecommendedBooks>({
//     queryKey: ['getRecommendedBooks'],
//     queryFn: getRecommendedBooks,
//   });
//   const recommendedBooks = recommendedBooksData?.body.data;

//   const navigate = useNavigate();

//   return (
//     <section className="w-full py-12 md:py-24 lg:py-32 bg-background/50 flex items-center justify-center">
//       <div className="container px-4 md:px-6">
//         <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
//           Recommended Books
//         </h2>
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//           {recommendedBooks?.map((book) => {
//             return (
//               <Card
//                 key={book.id}
//                 isPressable
//                 onPress={() => navigate(`/book/${book.id}`)}
//                 className="bg-background/80 border border-background/80 hover:border-primary hover:shadow-md hover:shadow-primary cursor-pointer group"
//               >
//                 <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
//                   <Image alt="Book cover" className="object-cover rounded-xl" src="" width={100} height={100} />
//                   <h4 className="font-bold text-large mt-4">{book.name}</h4>
//                   <p className="text-tiny uppercase font-bold">{book.author.name}</p>
//                 </CardHeader>
//                 <CardBody className="overflow-visible py-2">
//                   <p className="text-default-500">{book.description}</p>
//                 </CardBody>
//                 <CardFooter className="flex justify-between">
//                   <div className="flex items-center">
//                     <Star className="w-4 h-4 fill-warning text-warning mr-1" />
//                     <span className="text-sm font-bold">4.8</span>
//                   </div>
//                   <div className="flex items-center text-default-500 group-hover:text-white">
//                     <BookOpen className="w-4 h-4 mr-1" />
//                     <span className="text-sm">{book.category.name}</span>
//                   </div>
//                 </CardFooter>
//               </Card>
//             );
//           })}
//         </div>
//       </div>
//     </section>
//   );
// };

const StartToday = () => {
  const [email, setEmail] = useState('');

  const navigate = useNavigate();

  const { registerPage } = getAppsPath();

  const handleFormSubmission = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate(`${registerPage}?email=${encodeURI(email)}`);
  };

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-t from-background to-background/80 flex items-center justify-center">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl pb-2 md:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
              Start Your Reading Journey Today
            </h2>
            <p className="mx-auto max-w-[700px] text-gray-400 md:text-xl">
              Join Book-Toshokan and transform how you manage your reading experience.
            </p>
          </div>
          <div className="w-full max-w-sm space-y-2">
            <form className="flex space-x-2" onSubmit={handleFormSubmission}>
              <input
                className="max-w-lg flex-1 px-4 py-2 rounded-md bg-background border border-gray-600 text-foreground"
                placeholder="Enter your email"
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              <Button color="primary" type="submit">
                Sign Up
              </Button>
            </form>
            <p className="text-xs text-gray-400">
              By signing up, you agree to our{' '}
              <Link href="#" className="underline underline-offset-2">
                Terms & Privacy Policy
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export const HomePage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-1 bg-background text-foregroun items-center justify-center">
        <Welcome />
        <KeyFeatures />
        <ReadingStatus />
        {/* <RecommendedBooks /> */}
        <StartToday />
      </div>
    </div>
  );
};
