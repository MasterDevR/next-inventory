// "use client";
// import React, { Fragment, useState } from "react";
// import Image from "next/image";
// import DeleteStockBtn from "../ui/button/delete-stock-btn";
// const TableBody = ({ data }) => {
//   const [selectedItemId, setSelectedItemId] = useState(null);
//   const handleButtonClick = (itemData) => {
//     setSelectedItemId(selectedItemId === itemData.id ? null : itemData.id);
//   };

//   return (
//     <Fragment>
//       {data?.length > 0 ? (
//         data.map((item, index) => (
//           <tr key={index}>
//             <td>{item.item}</td>
//             <td>{item.price}</td>
//             <td>{item.quantity}</td>
//             <td>{item.measurement}</td>
//             <td>{item.description}</td>
//             <td>{item.stock_no}</td>
//             <td>{item.re_order_point}</td>
//             <td>{item.reference}</td>
//             <td>{item.consume_date}</td>
//             <td>{item.distributor}</td>
//             <td>
//               {item.image && (
//                 <Image
//                   src={item.image}
//                   height={50}
//                   width={50}
//                   placeholder="blur"
//                   sizes="auto"
//                   blurDataURL={item.image}
//                   alt={item.item}
//                   priority
//                 />
//               )}
//             </td>
//             <td className="relative">
//               <div
//                 className={`absolute z-10 p-2 w-32 bg-white rounded-md shadow-lg flex flex-col justify-center items-center gap-y-3 text-white ${
//                   selectedItemId === item.id ? "block" : "hidden"
//                 }`}
//                 style={{
//                   bottom: "100%",
//                   left: 0,
//                   transform: "translateY(4rem) translateX(-8rem)",
//                 }}
//               >
//                 <button className="w-4/6 bg-green-500 p-2 rounded-md hover:bg-green-600">
//                   Edit
//                 </button>
//                 <DeleteStockBtn
//                   key={item.id}
//                   stock_no={item.stock_no}
//                   id={item.id}
//                 />
//               </div>
//               <button
//                 onClick={() => handleButtonClick(item)}
//                 className="font-bold text-center w-full text-lg"
//               >
//                 ...
//               </button>
//             </td>
//           </tr>
//         ))
//       ) : (
//         <tr>
//           <td colSpan={12} className="text-center font-bold text-lg">
//             No Data Found
//           </td>
//         </tr>
//       )}
//     </Fragment>
//   );
// };

// export default React.memo(TableBody);
