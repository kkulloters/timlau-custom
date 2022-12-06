
frappe.ui.form.on('Lead', {
	refresh(frm) {
		frm.set_df_property("lead_name", "hidden", 1)
	},
	first_name(frm){
	    frm.trigger("format_name")
	},
	last_name(frm){
	    frm.trigger("format_name")
	},
	format_name(frm){
	    var fname = !frm.doc.first_name?"":frm.doc.first_name
	    var lname = !frm.doc.last_name? "":frm.doc.last_name
	    var fullname = fname + " " + lname
	    frm.set_value("lead_name", fullname)
	}
})