package com.examedge.payments;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class PaymentDetails {

	@Id
	private String transactionId;
	private String status;
	private String amount;
	private String currency;
	private String method;
	private String email;
	private String fname;
	private String lname;

	public String getTransactionId() {
		return transactionId;
	}

	public void setTransactionId(String transactionId) {
		this.transactionId = transactionId;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getAmount() {
		return amount;
	}

	public void setAmount(String amount) {
		this.amount = amount;
	}

	public String getCurrency() {
		return currency;
	}

	public void setCurrency(String currency) {
		this.currency = currency;
	}

	public String getMethod() {
		return method;
	}

	public void setMethod(String method) {
		this.method = method;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getFname() {
		return fname;
	}

	public void setFname(String fname) {
		this.fname = fname;
	}

	public String getLname() {
		return lname;
	}

	public void setLname(String lname) {
		this.lname = lname;
	}

	
	public PaymentDetails() {
		super();
		// TODO Auto-generated constructor stub
	}

	public PaymentDetails(String transactionId, String status, String amount, String currency, String method,
			String email, String fname, String lname) {
		super();
		this.transactionId = transactionId;
		this.status = status;
		this.amount = amount;
		this.currency = currency;
		this.method = method;
		this.email = email;
		this.fname = fname;
		this.lname = lname;
	}
	

}
