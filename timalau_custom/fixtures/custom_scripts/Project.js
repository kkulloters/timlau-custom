frappe.ui.form.on('Project', {
	company_2(frm) {
		// your code here
		if (frm.doc.company_2){
		    frm.set_value("company", frm.doc.company_2)
		}
	},
	company(frm) {
		// your code here
		if (frm.doc.company){
		    frm.set_value("company_2", frm.doc.company)
		}
	},
	sales_order(frm){
	    if (frm.doc.sales_order){
	        console.log(frm.doc.sales_order)
			frappe.call({
				method: "timalau_custom.api.project.get_so_items",
				args: {
				  "sales_order": frm.doc.sales_order
				},
				callback: function (r) {
				  if (r.message) {
					var items = r.message
					console.log(items)
					
					$.each(items || [], function(i, item){
						console.log(item.item_code, item.item_name, item.description, item.qty)
						let row = frm.add_child("project_item")
						row.item_code = item.item_code
						row.item_name = item.item_name
						row.description = item.description
						row.qty = item.qty
					  })
					  frm.refresh_field("project_item")
			
				  }
				},
			  });
	  
	    }
	},
	refresh(frm){
		frm.set_df_property("naming_series", "hidden", 1);
		if (frm.is_new() && frm.doc.sales_order){
			frm.trigger("sales_order")
		}
		if (frm.is_new() && frm.doc.project_name){
			frm.set_value("order_barcode", frm.doc.project_name)
		}
		frm.set_query("sales_order", function() {
		return {
			filters: {
			status: ["not in", "Closed, Cancelled, To Bill, Completed"],
			company: frm.doc.company,
			docstatus: 1
			}
		};
		});
	}
})