module.exports.all = (req, res) => {
	req.getConnection((err, connection) => {
		connection.query('SELECT * FROM customers', (err, rows) => {
			if (err) throw new Error;
			res.render('customers', {page_title: 'IMT-CRM Users', data: rows})
		})
	})
}

module.exports.add = (req, res) => {
	res.render('add_customers', {page_title: 'Add user in CRM system'});
}

module.exports.edit = (req, res) => {
	let id = req.params.id;
	req.getConnection( (err, connection) => {
		connection.query('SELECT * FROM customers WHERE id = ?', [id], function (err, rows) {
			if (err) throw new Error;
			res.render('edit_customers', {page_title: 'Change user in CRM system', data: rows})
		});
	})
};

module.exports.save = (req, res) => {
	let input = req.body;
	req.getConnection( (err, connection) => {
		let data = {
			name: input.name,
			address: input.address,
			email: input.email,
			phone: input.phone
		};
		connection.query('INSERT INTO customers SET ?', [data], (err, rows) => {
			if (err) console.log(err);
			res.redirect('/customers');
		});
	});
};

module.exports.edit_save = (req, res) => {
	let input = req.body;
	let id = req.params.id;
	req.getConnection( (err, connection) => {
		if (err) throw new Error;
		let data = {
			name: input.name,
			address: input.address,
			email: input.email,
			phone: input.phone
		};
		connection.query('UPDATE customers SET ? WHERE id = ? ', [data, id], (err, rows) => {
			if (err) console.log(err);
			res.redirect('/customers');
		});
	});
};

module.exports.delete = (req, res) => {
	let id = req.params.id;
	req.getConnection( (err, connection) => {
		connection.query('DELETE FROM customers WHERE id = ? ', [id], (err, rows) => {
			if (err) throw new Error;
			res.redirect('/customers');
		})
	})
}