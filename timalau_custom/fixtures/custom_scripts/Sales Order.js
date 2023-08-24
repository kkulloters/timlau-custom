frappe.ui.form.on('Sales Order', {
	refresh(frm) {
		// your code here
		if (frm.is_new()){
		    const currentDate = frappe.datetime.get_today();
		    frm.set_value('delivery_date', currentDate);
		    frm.set_value('payment_terms_template', 'Net 7')
		    
		    frappe.db.get_value('Sales Taxes and Charges Template', {title:'Credit Card Service Charge 4%', company: frm.doc.company}, 'name', (r) => {
    			if (r) {
    				frm.set_value('taxes_and_charges', r.name)
        			}
    		});
		}
		
	},
	company(frm){
	    frappe.db.get_value('Sales Taxes and Charges Template', {title:'Credit Card Service Charge 4%', company: frm.doc.company}, 'name', (r) => {
			if (r) {
				frm.set_value('taxes_and_charges', r.name)
			}
		});
	}
})