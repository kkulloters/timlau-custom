import frappe

@frappe.whitelist()
def get_so_items(sales_order):
	data = frappe.db.get_list("Sales Order Item", {"parent": sales_order}, ["item_code", "item_name", "description", "qty"])
	return data
