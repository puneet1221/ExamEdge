package com.examedge.payments;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.paypal.api.payments.Links;
import com.paypal.api.payments.Payment;
import com.paypal.base.rest.PayPalRESTException;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequiredArgsConstructor
@Slf4j
public class PaypalController {

	private Logger log = LoggerFactory.getLogger(getClass());

	@Autowired
	private PaypalService paypalService;
	@Autowired
	private PaymentDetailsRepo payDetailsRepo;

	@PostMapping("/payment/create")
	public ResponseEntity<?> createPayment(@RequestBody PaymentRequest paymentRequest) {
		try {
			String cancelUrl = "http://localhost:8080/user/payment/cancel";
			String successUrl = "http://localhost:8080/user/payment/success";
			Payment payment = paypalService.createPayment(paymentRequest.getAmount(), paymentRequest.getCurrency(),
					paymentRequest.getMethod(), "sale", paymentRequest.getDescription(), cancelUrl, successUrl);

			
			
			for (Links links : payment.getLinks()) {
				if ("approval_url".equals(links.getRel())) {
					//if payment request is created redirect to paypals website
					return ResponseEntity.ok(new PaymentResponse(links.getHref()));
				}
			}
		} catch (PayPalRESTException e) {
			log.error("Error occurred:: ", e);
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
					.body(new ErrorResponse("Error creating payment"));
		}
		return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
				.body(new ErrorResponse("Payment creation failed"));
	}

	
	
	//if payment request success then user is redirected to this endpoint with URL---> ...?paymentId=xxxx&payerId=abcd...
	/*
	 * from here user will be redirect to paypal's website for the payment
	 *after completing the payment  it will save the details in db
	 *and redirect to success url in react project
	 * 	 * 
	 */
	@GetMapping("user/payment/success")
	@Transactional
	public ResponseEntity<?> paymentSuccess(@RequestParam String paymentId, @RequestParam("PayerID") String payerId) {
		try {
			//proceed to paypal payment gateway 

			Payment payment = paypalService.executePayment(paymentId, payerId);
			
			//if paymet is approved i.e successfully completed  it will save transation details in database and 
			//send the user success page as the response
			if ("approved".equals(payment.getState())) {

				String transactionId = payment.getId();
				String paymentStatus = payment.getState();
				String currency = payment.getTransactions().get(0).getAmount().getCurrency();
				double amount = Double.parseDouble(payment.getTransactions().get(0).getAmount().getTotal());
				String paymentMethod = payment.getPayer().getPaymentMethod();
				String payerEmail = payment.getPayer().getPayerInfo().getEmail();
				String payerFirstName = payment.getPayer().getPayerInfo().getFirstName();
				String payerLastName = payment.getPayer().getPayerInfo().getLastName();
				PaymentDetails detail = new PaymentDetails(transactionId, paymentStatus, amount + "", currency,
						paymentMethod, payerEmail, payerFirstName, payerLastName);
				payDetailsRepo.save(detail);
				String redirectUrl = "http://localhost:5173/payment/success?paymentId=" + transactionId + "&status="
						+ paymentStatus;
				return ResponseEntity.status(HttpStatus.FOUND).header("Location", redirectUrl).build(); 
			}
		} catch (PayPalRESTException e) {
			log.error("Error occurred:: ", e);
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
					.body(new ErrorResponse("Error executing payment"));
		}
		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ErrorResponse("Payment not approved"));
	}

	
	//if payments get cancelled while user was doing payment paypal  send the control  to this endpoint
	@GetMapping("user/payment/cancel")
	public ResponseEntity<?> paymentCancel() {
		return ResponseEntity.status(HttpStatus.FOUND).header("Location", "http://localhost:5173/payment/cancel")
				.build();
	}

	// Inner static class for structured responses
	public static class PaymentResponse {
		private String approvalUrl;

		public PaymentResponse(String approvalUrl) {
			this.approvalUrl = approvalUrl;
		}

		public String getApprovalUrl() {
			return approvalUrl;
		}

		public void setApprovalUrl(String approvalUrl) {
			this.approvalUrl = approvalUrl;
		}
	}

	public static class ErrorResponse {
		private String message;

		public ErrorResponse(String message) {
			this.message = message;
		}

		public String getMessage() {
			return message;
		}

		public void setMessage(String message) {
			this.message = message;
		}
	}

	public static class PaymentSuccessResponse {
		private String status;
		private Payment payment;

		public PaymentSuccessResponse(String status, Payment payment) {
			this.status = status;
			this.payment = payment;
		}

		public String getStatus() {
			return status;
		}

		public void setStatus(String status) {
			this.status = status;
		}

		public Payment getPayment() {
			return payment;
		}

		public void setPayment(Payment payment) {
			this.payment = payment;
		}
	}
}

class PaymentRequest {

	private String method;

	private double amount;

	private String currency;

	private String description;

	// Constructor
	public PaymentRequest(String method, double amount, String currency, String description) {
		this.method = method;
		this.amount = amount;
		this.currency = currency;
		this.description = description;
	}

	// Default constructor for deserialization
	public PaymentRequest() {
	}

	// Getters and setters
	public String getMethod() {
		return method;
	}

	public void setMethod(String method) {
		this.method = method;
	}

	public double getAmount() {
		return amount;
	}

	public void setAmount(double amount) {
		this.amount = amount;
	}

	public String getCurrency() {
		return currency;
	}

	public void setCurrency(String currency) {
		this.currency = currency;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}
}
