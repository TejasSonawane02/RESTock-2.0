import { useEffect, useState } from "react";
import API from "../services/api";

export default function Orders() {
	const [orders, setOrders] = useState([]);
	const [orderItems, setOrderItems] = useState([]);
	const [customers, setCustomers] = useState([]);
	const [products, setProducts] = useState([]);

	const [orderForm, setOrderForm] = useState({
		customer_person_id: "",
		sale_date: ""
	});

	const [editingOrderId, setEditingOrderId] = useState(null);
	const [editOrderForm, setEditOrderForm] = useState({
		customer_person_id: "",
		sale_date: ""
	});

	const [itemForm, setItemForm] = useState({
		sale_id: "",
		product_id: "",
		quantity_sold: ""
	});

	const [editingItemId, setEditingItemId] = useState(null);
	const [editItemForm, setEditItemForm] = useState({
		sale_id: "",
		product_id: "",
		quantity_sold: ""
	});

	const fetchData = async () => {
		try {
			const [salesRes, itemsRes, customersRes, productsRes] =
				await Promise.all([
					API.get("/sales"),
					API.get("/order-items"),
					API.get("/customers"),
					API.get("/products")
				]);

			setOrders(salesRes.data);
			setOrderItems(itemsRes.data);
			setCustomers(customersRes.data);
			setProducts(productsRes.data);
		} catch (error) {
			console.error("Error fetching orders data:", error);
		}
	};

	useEffect(() => {
		fetchData();
	}, []);

	const formatDate = (value) => {
		if (!value) return "";
		if (typeof value === "string" && value.length >= 10) {
			return value.slice(0, 10);
		}
		return value;
	};

	const getCustomerIdByName = (firstName, lastName) => {
		const match = customers.find(
			(c) =>
				c.first_name === firstName &&
				c.last_name === lastName
		);
		return match ? match.person_id : "";
	};

	const getProductIdByName = (productName) => {
		const match = products.find((p) => p.name === productName);
		return match ? match.product_id : "";
	};

	// Orders
	const addOrder = async () => {
		const { customer_person_id, sale_date } = orderForm;
		if (!customer_person_id || !sale_date) return;

		try {
			await API.post("/sales", orderForm);
			setOrderForm({ customer_person_id: "", sale_date: "" });
			fetchData();
		} catch (error) {
			console.error("Error adding order:", error);
		}
	};

	const updateOrder = async () => {
		const { customer_person_id, sale_date } = editOrderForm;
		if (!editingOrderId || !customer_person_id || !sale_date) return;

		try {
			await API.put(`/sales/${editingOrderId}`, editOrderForm);
			setEditingOrderId(null);
			setEditOrderForm({ customer_person_id: "", sale_date: "" });
			fetchData();
		} catch (error) {
			console.error("Error updating order:", error);
		}
	};

	const deleteOrder = async (id) => {
		const itemsInOrder = orderItems.filter((item) => Number(item.sale_id) === Number(id));
		
		const confirmed = window.confirm(
			"⚠️  WARNING: Deleting this order will also delete:\n" +
			`• ${itemsInOrder.length} order item(s)\n\n` +
			"This action cannot be undone. Continue?"
		);

		if (!confirmed) return;

		try {
			await API.delete(`/sales/${id}`);
			fetchData();
		} catch (error) {
			console.error("Error deleting order:", error);
		}
	};

	// Order Items
	const addOrderItem = async () => {
		const { sale_id, product_id, quantity_sold } = itemForm;
		if (!sale_id || !product_id || !quantity_sold) return;

		try {
			await API.post("/order-items", itemForm);
			setItemForm({ sale_id: "", product_id: "", quantity_sold: "" });
			fetchData();
		} catch (error) {
			console.error("Error adding order item:", error);
		}
	};

	const updateOrderItem = async () => {
		const { sale_id, product_id, quantity_sold } = editItemForm;
		if (!editingItemId || !sale_id || !product_id || !quantity_sold) return;

		try {
			await API.put(`/order-items/${editingItemId}`, editItemForm);
			setEditingItemId(null);
			setEditItemForm({ sale_id: "", product_id: "", quantity_sold: "" });
			fetchData();
		} catch (error) {
			console.error("Error updating order item:", error);
		}
	};

	const deleteOrderItem = async (id) => {
		const confirmed = window.confirm(
			"⚠️  Are you sure you want to delete this order item?\n\n" +
			"This action cannot be undone."
		);

		if (!confirmed) return;

		try {
			await API.delete(`/order-items/${id}`);
			fetchData();
		} catch (error) {
			console.error("Error deleting order item:", error);
		}
	};

	return (
		<div>
			<h2 className="text-xl font-semibold mb-4">Orders</h2>

			{/* Add Order */}
			<div className="grid grid-cols-2 gap-4 mb-6">
				<select
					name="customer_person_id"
					value={orderForm.customer_person_id}
					onChange={(e) =>
						setOrderForm({
							...orderForm,
							customer_person_id: e.target.value
						})
					}
					className="border p-2 rounded"
				>
					<option value="">Select Customer</option>
					{customers.map((c) => (
						<option key={c.person_id} value={c.person_id}>
							{c.first_name} {c.last_name}
						</option>
					))}
				</select>

				<input
					type="date"
					name="sale_date"
					value={orderForm.sale_date}
					onChange={(e) =>
						setOrderForm({ ...orderForm, sale_date: e.target.value })
					}
					className="border p-2 rounded"
				/>

				<button
					onClick={addOrder}
					disabled={!orderForm.customer_person_id || !orderForm.sale_date}
					className="bg-blue-600 text-white px-4 py-2 rounded col-span-2 disabled:bg-gray-400"
				>
					Add Order
				</button>
			</div>

			{/* Add Order Item */}
			<div className="grid grid-cols-3 gap-4 mb-8">
				<select
					name="sale_id"
					value={itemForm.sale_id}
					onChange={(e) =>
						setItemForm({ ...itemForm, sale_id: e.target.value })
					}
					className="border p-2 rounded"
				>
					<option value="">Select Order</option>
					{orders.map((o) => (
						<option key={o.sale_id} value={o.sale_id}>
							#{o.sale_id} - {o.first_name} {o.last_name}
						</option>
					))}
				</select>

				<select
					name="product_id"
					value={itemForm.product_id}
					onChange={(e) =>
						setItemForm({ ...itemForm, product_id: e.target.value })
					}
					className="border p-2 rounded"
				>
					<option value="">Select Product</option>
					{products.map((p) => (
						<option key={p.product_id} value={p.product_id}>
							{p.name}
						</option>
					))}
				</select>

				<input
					name="quantity_sold"
					placeholder="Quantity"
					value={itemForm.quantity_sold}
					onChange={(e) =>
						setItemForm({ ...itemForm, quantity_sold: e.target.value })
					}
					className="border p-2 rounded"
				/>

				<button
					onClick={addOrderItem}
					disabled={!itemForm.sale_id || !itemForm.product_id || !itemForm.quantity_sold}
					className="bg-blue-600 text-white px-4 py-2 rounded col-span-3 disabled:bg-gray-400"
				>
					Add Order Item
				</button>
			</div>

			{/* Orders List */}
			<ul className="space-y-3">
				{orders.map((o) => {
					const totalItems = orderItems
						.filter((item) => Number(item.sale_id) === Number(o.sale_id))
						.reduce(
							(sum, item) => sum + Number(item.quantity_sold || 0),
							0
						);

					return (
					<li
						key={o.sale_id}
						className="p-4 bg-gray-100 rounded shadow-sm"
					>
						<div className="flex justify-between items-center">
							{editingOrderId === o.sale_id ? (
								<div className="flex gap-2 items-center flex-wrap">
									<select
										value={editOrderForm.customer_person_id}
										onChange={(e) =>
											setEditOrderForm({
												...editOrderForm,
												customer_person_id: e.target.value
											})
										}
										className="border p-2 rounded"
									>
										<option value="">Select Customer</option>
										{customers.map((c) => (
											<option key={c.person_id} value={c.person_id}>
												{c.first_name} {c.last_name}
											</option>
										))}
									</select>

									<input
										type="date"
										value={editOrderForm.sale_date}
										onChange={(e) =>
											setEditOrderForm({
												...editOrderForm,
												sale_date: e.target.value
											})
										}
										className="border p-2 rounded"
									/>

									<button
										onClick={updateOrder}
										className="bg-green-500 text-white px-2 py-1 rounded"
									>
										Save
									</button>
									<button
										onClick={() => {
											setEditingOrderId(null);
											setEditOrderForm({
												customer_person_id: "",
												sale_date: ""
											});
										}}
										className="bg-gray-400 text-white px-2 py-1 rounded"
									>
										Cancel
									</button>
								</div>
							) : (
								<div>
									<p className="font-semibold">
										Order #{o.sale_id} - {o.first_name} {o.last_name}
									</p>
									<p className="text-sm text-gray-600">
										Date: {formatDate(o.sale_date)}
									</p>
									<p className="text-sm text-gray-600">
										Total Items: {totalItems}
									</p>
								</div>
							)}

							<div className="flex gap-2">
								{editingOrderId !== o.sale_id && (
									<button
										onClick={() => {
											setEditingOrderId(o.sale_id);
											setEditOrderForm({
												customer_person_id: getCustomerIdByName(
													o.first_name,
													o.last_name
												),
												sale_date: formatDate(o.sale_date)
											});
										}}
										className="bg-yellow-500 text-white px-2 py-1 rounded"
									>
										Edit
									</button>
								)}
								<button
									onClick={() => deleteOrder(o.sale_id)}
									className="bg-red-500 text-white px-2 py-1 rounded"
								>
									Delete
								</button>
							</div>
						</div>

						{/* Items for this order */}
						<div className="mt-3 space-y-2">
							{orderItems
								.filter(
									(item) => Number(item.sale_id) === Number(o.sale_id)
								)
								.map((item) => (
									<div
										key={item.sale_item_id}
										className="p-2 bg-white rounded flex justify-between items-center"
									>
										{editingItemId === item.sale_item_id ? (
											<div className="flex gap-2 items-center flex-wrap">
												<select
													value={editItemForm.product_id}
													onChange={(e) =>
														setEditItemForm({
															...editItemForm,
															product_id: e.target.value
														})
													}
													className="border p-2 rounded"
												>
													<option value="">Select Product</option>
													{products.map((p) => (
														<option key={p.product_id} value={p.product_id}>
															{p.name}
														</option>
													))}
												</select>

												<input
													value={editItemForm.quantity_sold}
													onChange={(e) =>
														setEditItemForm({
															...editItemForm,
															quantity_sold: e.target.value
														})
													}
													className="border p-2 rounded w-28"
													placeholder="Qty"
												/>

												<button
													onClick={updateOrderItem}
													className="bg-green-500 text-white px-2 py-1 rounded"
												>
													Save
												</button>
												<button
													onClick={() => {
														setEditingItemId(null);
														setEditItemForm({
															sale_id: "",
															product_id: "",
															quantity_sold: ""
														});
													}}
													className="bg-gray-400 text-white px-2 py-1 rounded"
												>
													Cancel
												</button>
											</div>
										) : (
											<div>
												<p className="font-medium">{item.product}</p>
												<p className="text-sm text-gray-600">
													Quantity: {item.quantity_sold}
												</p>
											</div>
										)}

										<div className="flex gap-2">
											{editingItemId !== item.sale_item_id && (
												<button
													onClick={() => {
														setEditingItemId(item.sale_item_id);
														setEditItemForm({
															sale_id: item.sale_id,
															product_id: getProductIdByName(item.product),
															quantity_sold: item.quantity_sold
														});
													}}
													className="bg-yellow-500 text-white px-2 py-1 rounded"
												>
													Edit
												</button>
											)}
											<button
												onClick={() => deleteOrderItem(item.sale_item_id)}
												className="bg-red-500 text-white px-2 py-1 rounded"
											>
												Delete
											</button>
										</div>
									</div>
								))}

							{orderItems.filter(
								(item) => Number(item.sale_id) === Number(o.sale_id)
							).length === 0 && (
								<p className="text-sm text-gray-500">No items yet.</p>
							)}
						</div>
					</li>
				);
				})}
			</ul>
		</div>
	);
}
