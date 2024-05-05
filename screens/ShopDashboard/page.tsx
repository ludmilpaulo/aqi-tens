"use client";
import React, { ReactNode, useEffect, useState } from "react";
import { Transition } from "@headlessui/react";
import { useSelector } from "react-redux";

// Adjust the import path accordingly
import { FornecedorType, basAPI } from "@/configs/variable";
import withAuth from "@/components/ProtectedPage";
import { selectUser } from "@/redux/slices/authSlice";
import Sidebar from "@/components/Sidebar";

const ShopDashboard: React.FC = () => {
  const user = useSelector(selectUser);
  const [fornecedor, setFornecedor] = useState<FornecedorType | null>(null);

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  console.log("usuario", user);

  useEffect(() => {
    const fetchFornecedorData = async () => {
      if (user?.user_id) {
        try {
          const response = await fetch(
            `${basAPI}/shops/get_fornecedor/?user_id=${user.user_id}`,
          );
          if (response.ok) {
            const data = await response.json();

            if (data.fornecedor && data.fornecedor.length > 0) {
              setFornecedor(data.fornecedor[0]);
            }
          } else {
            console.error("Failed to fetch fornecedor data");
          }
        } catch (error) {
          console.error("An error occurred:", error);
        }
      }
    };
    fetchFornecedorData();
  }, [user]);

  return (
    <div className="relative h-full">
      <Transition
        show={loading}
        enter="transition-opacity duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-300"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        {loading && (
          <div className="fixed top-0 left-0 z-50 flex items-center justify-center w-full h-full">
            <div className="w-32 h-32 border-t-2 border-b-2 border-blue-500 rounded-full animate-spin"></div>
          </div>
        )}
      </Transition>

      {error && <p>Error: {error}</p>}
      {!loading && !error && <Sidebar fornecedor={fornecedor} />}
      {/* Render any other necessary components here */}
    </div>
  );
};

export default withAuth(ShopDashboard);
