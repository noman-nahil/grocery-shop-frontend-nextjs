import React from "react";

const OrderSuccessful = (props) => {
  return (
    <div className="fixed bottom-0 right-0 inset-y-1/4 md:inset-1/4 w-full h-fit md:w-2/4  p-8 md:p-0">
      <div className="modal-content bg-white p-6 rounded-lg shadow-lg border border-2 ">
        <div className="flex">
          <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-green-500 rounded-lg">
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
            </svg>
            <span className="sr-only">Check icon</span>
          </div>
          <h2 className="text-xl font-semibold mb-4">
            Order placed successfully
          </h2>
          {/* <button
                className=" bg-white text-lg text-black font-bold py-2 px-4 rounded ml-auto"
                onClick={cartMessageHide}
              >
                X
              </button> */}
          <button
            type="button"
            className="ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 inline-flex items-center justify-center h-8 w-8 "
            data-dismiss-target="#toast-success"
            aria-label="Close"
            onClick={props.orderMsgHide}
          >
            <span className="sr-only">Close</span>
            <svg
              className="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokewidth-="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccessful;
