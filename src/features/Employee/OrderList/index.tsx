import { Order, payloadType } from "./type";
import { formatTime } from "@/utils/Formatters/formatTime";
import { useState } from "react";
import { ORDERSTATUS } from "@prisma/client";
import styles from "./index.module.css";
import Head from "next/head";
import { supabase } from "@/utils/Supabase/supabaseClient";
import { Tables } from "../Top/type";

export const OrderList = ({ orders, tables }: { orders: Order[]; tables: Tables }) => {
  // オーダー一覧を管理するstate
  const [orderList, setOrderList] = useState<Order[]>(orders);
  // モーダルの表示状態を管理するstate
  const [isModalOpen, setIsModalOpen] = useState(false);
  // 選択されたオーダーを管理するstate
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  // 店舗のフィルター
  const [selectedStore, setSelectedStore] = useState("");

  // モーダルを開く関数
  const handleOpenModal = (order: Order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  // ステータス更新関数
  const handleStatusChange = (e: React.MouseEvent, orderDetailId: number, newStatus: ORDERSTATUS) => {
    e.stopPropagation();
    setSelectedOrder((currentOrder) => {
      if (!currentOrder) return null;

      return {
        ...currentOrder,
        orderDetail: currentOrder.orderDetail.map((detail) =>
          detail.orderDetailId === orderDetailId ? { ...detail, orderStatus: newStatus } : detail,
        ),
      };
    });
  };

  // モーダルを閉じる関数
  const handleCloseModal = async () => {
    // 選択されたオーダーの最新のステータスを取得する
    const updatedOrderDetails = selectedOrder?.orderDetail.map((detail) => ({
      orderDetailId: detail.orderDetailId,
      orderStatus: detail.orderStatus,
    }));

    if (updatedOrderDetails) {
      try {
        const response = await fetch("/api/order/detail/update", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ updates: updatedOrderDetails }),
        });

        // 表示するオーダーステータスを更新する
        if (response.ok) {
          const updatedOrderList = orderList.map((order) => {
            if (order.orderId === selectedOrder?.orderId) {
              return {
                ...order,
                orderDetail: order.orderDetail.map((detail) => {
                  const updatedDetail = updatedOrderDetails.find(
                    (updatedDetail) => updatedDetail.orderDetailId === detail.orderDetailId,
                  );
                  if (updatedDetail) {
                    return {
                      ...detail,
                      orderStatus: updatedDetail.orderStatus,
                    };
                  }
                  return detail;
                }),
              };
            }
            return order;
          });

          setOrderList(updatedOrderList);
        } else if (!response.ok) {
          throw new Error("Server error occurred");
        }
      } catch (error) {
        console.error("Error updating statuses", error);
      }
    }

    setIsModalOpen(false);
  };

  // モーダルの外側をクリックした時にモーダルを閉じる関数
  const handleClickOutside = () => {
    setIsModalOpen(false);
  };

  // モーダル内の要素をクリックした時にモーダルを閉じないようにする関数
  const handleCLickModal = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const handleStoreChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedStore(e.target.value);
  };

  const onReceive = async (payload: unknown) => {
    const pl = payload as payloadType;
    if (pl.eventType === "UPDATE") return;
    const res = await fetch("/api/order/getall", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.ok) {
      const data = (await res.json()) as Order[];
      setOrderList(data);
    }
  };

  supabase
    .channel("procon-test")
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    .on("postgres_changes", { event: "*", schema: "public", table: "Order" }, onReceive)
    .subscribe();

  return (
    <>
      <Head>
        <title>オーダー一覧 | PersonalizedMenu</title>
      </Head>
      <div className={styles["container"]}>
        <div className={styles["header"]}>
          <h1>オーダー一覧</h1>
          <select onChange={handleStoreChange} value={selectedStore} className={styles.filterSelect}>
            <option value="">すべての店舗</option>
            {Array.from(new Set(tables.map((table) => table.store.storeName)))
              .sort()
              .map((storeName) => (
                <option key={storeName} value={storeName}>
                  {storeName}
                </option>
              ))}
          </select>
        </div>

        <div className={styles["order-list"]}>
          <div className={styles["order-container"]}>
            {orderList.map((order) => {
              // ここで全てのorderDetailがSERVEDかどうかをチェック
              const isAllServed = order.orderDetail.every((detail) => detail.orderStatus === ORDERSTATUS.SERVED);

              // 全てがSERVEDなら何も表示しない
              if (isAllServed) return null;

              // それ以外の場合、注文を表示
              return (
                (selectedStore === "" || order.storeTable.store.storeName === selectedStore) && (
                  <div key={order.orderId} className={styles["order-card"]} onClick={() => handleOpenModal(order)}>
                    <div className={styles["order-header"]}>
                      <h2>{order.storeTable.tableName}</h2>
                      <p>{formatTime(order.orderedAt)}</p>
                    </div>
                    <ul className={styles["order-details"]}>
                      {order.orderDetail.map((detail) => (
                        <li key={detail.orderDetailId} className={styles["order-item"]}>
                          <span>{detail.product.productName}</span>
                          <span>×{detail.quantity}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )
              );
            })}
          </div>
        </div>
      </div>
      {isModalOpen && selectedOrder && (
        <div className={styles.modal} onClick={handleClickOutside}>
          <div className={styles.modalContent} onClick={handleCLickModal}>
            <h2>{selectedOrder.storeTable.tableName}</h2>
            <ul className={styles["order-details"]}>
              {selectedOrder.orderDetail.map((detail) => (
                <li key={detail.orderDetailId}>
                  <span>{detail.product.productName}</span>
                  <span>
                    <button
                      className={
                        detail.orderStatus === ORDERSTATUS.COOKING ? styles["status-active"] : styles["status"]
                      }
                      onClick={(e) => handleStatusChange(e, detail.orderDetailId, ORDERSTATUS.COOKING)}
                    >
                      調理中
                    </button>
                    <button
                      className={detail.orderStatus === ORDERSTATUS.COOKED ? styles["status-active"] : styles["status"]}
                      onClick={(e) => handleStatusChange(e, detail.orderDetailId, ORDERSTATUS.COOKED)}
                    >
                      完成
                    </button>
                    <button
                      className={detail.orderStatus === ORDERSTATUS.SERVED ? styles["status-active"] : styles["status"]}
                      onClick={(e) => handleStatusChange(e, detail.orderDetailId, ORDERSTATUS.SERVED)}
                    >
                      お届け済み
                    </button>
                  </span>
                </li>
              ))}
            </ul>
            {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
            <button className={styles["button"]} onClick={handleCloseModal}>
              閉じる
            </button>
          </div>
        </div>
      )}
    </>
  );
};
