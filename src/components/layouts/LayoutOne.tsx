// import React from "react";
// import { Button } from "@/src/components/shadcn/Button";
// import { Separator } from "@/src/components/shadcn/Separator";

// import LimitedListingCards from "@/src/components/tables/LimitedListingCards";

// const LayoutOne = () => {
//   const { data: organization } = useGetOrganization();
//   return (
//     <div
//       style={{
//         backgroundColor: organization?.primaryColor || "",
//         minHeight: "100vh",
//       }}
//     >
//       <div className="flex justify-between items-center p-2">
//         <img
//           src={organization?.logo?.url}
//           alt="Organization Logo"
//           className="w-16 h-16"
//         />
//         <div>
//           <a href="/" className="mr-4">
//             <Button
//               variant="outline"
//               className="mr-4"
//               style={{ borderColor: organization?.accentColor || undefined }}
//             >
//               About
//             </Button>
//           </a>
//           <a href="/listings" className="mr-4">
//             <Button
//               variant="outline"
//               style={{ borderColor: organization?.accentColor || undefined }}
//             >
//               Job Listings
//             </Button>
//           </a>
//         </div>
//       </div>

//       <Separator
//         className="w-full mb-2"
//         style={{ backgroundColor: organization?.accentColor || "" }}
//       />

//       <div className="relative">
//         <img
//           src={organization?.banner?.url}
//           alt="Organization Banner"
//           className="w-full h-48 object-cover"
//         />
//         <header
//           className={`text-${organization?.headerFont} p-2 w-full absolute top-0 bottom-0 left-0 right-0 flex flex-col justify-center items-center text-white mx-auto`}
//         >
//           <h1>{organization?.title}</h1>
//           <p style={{ marginTop: "4px" }}>{organization?.description}</p>
//         </header>
//       </div>

//       <Separator
//         className="w-full mt-2"
//         style={{ backgroundColor: organization?.accentColor || "" }}
//       />

//       <main className="container mx-auto mt-4 text-center">
//         <section>
//           <h2 className={`text-2xl font-bold text-${organization?.bodyFont}`}>
//             Current Job Openings
//           </h2>
//           <div className="text-left">
//             <LimitedListingCards limit={2} />
//           </div>
//           <a href="/listings">
//             <Button
//               className="!mt-2"
//               style={{ backgroundColor: organization?.secondaryColor || "" }}
//               type="button"
//             >
//               View All Job Listings
//             </Button>
//           </a>
//         </section>
//       </main>
//       <footer
//         className={`mt-8 py-4 text-${organization?.bodyFont} text-center w-full`}
//       >
//         <p className={`text-sm`}>
//           &copy; {new Date().getFullYear()} {organization?.title}. All rights
//           reserved.
//         </p>
//       </footer>
//     </div>
//   );
// };

// export default LayoutOne;
