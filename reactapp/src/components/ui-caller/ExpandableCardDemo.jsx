"use client";

import React, { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useOutsideClick } from "../hook/useOutsideClick";
import axios from "axios";

export function ExpandableCardDemo() {
  const [active, setActive] = useState(null);
  const [reservations, setReservations] = useState([]);
  const [restaurants, setRestaurants] = useState({});
  const ref = useRef(null);
  const id = useId();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch reservations
        const resResponse = await axios.get("http://localhost:8080/api/reservations");
        setReservations(resResponse.data);

        // Fetch restaurant names for each reservation
        const restaurantPromises = resResponse.data.map(async (res) => {
          if (!restaurants[res.restaurantId]) {
            const restResponse = await axios.get(
              `http://localhost:8080/api/restaurants/${res.restaurantId}`
            );
            return { id: res.restaurantId, data: restResponse.data };
          }
          return null;
        });

        const results = await Promise.all(restaurantPromises);
        const restMap = {};
        results.forEach((r) => {
          if (r) restMap[r.id] = r.data;
        });

        setRestaurants(restMap);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    function onKeyDown(event) {
      if (event.key === "Escape") setActive(false);
    }
    if (active && typeof active === "object") {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active]);

  useOutsideClick(ref, () => setActive(null));

  // FIX: Combine date + time into valid ISO string
  const formatDateTime = (reservation) => {
    if (!reservation?.reservationDate || !reservation?.reservationTime) return "Invalid Date";
    const combined = new Date(`${reservation.reservationDate}T${reservation.reservationTime}`);
    if (isNaN(combined)) return "Invalid Date";
    return combined.toLocaleString([], { dateStyle: "medium", timeStyle: "short" });
  };

  return (
    <>
      <AnimatePresence>
        {active && typeof active === "object" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 h-full w-full z-10"
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {active && typeof active === "object" ? (
          <div className="fixed inset-0 grid place-items-center z-[100]">
            <motion.button
              key={`button-${active.id}-${id}`}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.05 } }}
              className="flex absolute top-2 right-2 lg:hidden items-center justify-center bg-white rounded-full h-6 w-6"
              onClick={() => setActive(null)}
            >
              <CloseIcon />
            </motion.button>

            <motion.div
              layoutId={`card-${active.id}-${id}`}
              ref={ref}
              className="w-full max-w-[500px] h-full md:h-fit md:max-h-[90%] flex flex-col bg-white dark:bg-neutral-900 sm:rounded-3xl overflow-hidden"
            >
              <div className="p-4">
                <motion.h3 className="font-bold text-neutral-700 dark:text-neutral-200">
                  Reservation #{active.id}
                </motion.h3>
                <p className="text-neutral-600 dark:text-neutral-400">
                  Restaurant: {restaurants[active.restaurantId]?.name} (
                  {restaurants[active.restaurantId]?.cuisine})
                </p>
                <p>Customer: {active.customerName}</p>
                <p>Email: {active.customerEmail}</p>
                <p>Phone: {active.customerPhone}</p>
                <p>Reservation Time: {formatDateTime(active)}</p>
                <p>Guests: {active.partySize}</p>
              </div>
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>

      <ul className="max-w-2xl mx-auto w-full gap-4">
        {reservations.map((reservation) => (
          <motion.div
            layoutId={`card-${reservation.id}-${id}`}
            key={reservation.id}
            onClick={() => setActive(reservation)}
            className="p-4 flex flex-col md:flex-row justify-between items-center hover:bg-neutral-50 dark:hover:bg-neutral-800 rounded-xl cursor-pointer"
          >
            <div>
              <motion.h3 className="font-medium text-neutral-800 dark:text-neutral-200">
                {restaurants[reservation.restaurantId]?.name || "Loading..."}
              </motion.h3>
              <motion.p className="text-neutral-600 dark:text-neutral-400 text-sm">
                {formatDateTime(reservation)}
              </motion.p>
            </div>
            <motion.button className="px-4 py-2 text-sm rounded-full font-bold bg-gray-100 hover:bg-green-500 hover:text-white text-black">
              View Details
            </motion.button>
          </motion.div>
        ))}
      </ul>
    </>
  );
}

export const CloseIcon = () => (
  <motion.svg
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0, transition: { duration: 0.05 } }}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-4 w-4 text-black"
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path d="M18 6l-12 12" />
    <path d="M6 6l12 12" />
  </motion.svg>
);
