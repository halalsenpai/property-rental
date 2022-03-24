import { Card, PageHeader } from "antd";
import React from "react";

export const SubscriptionPage = () => {
  return (
    <>
      <PageHeader className="subscription-page-header" onBack={() => window.history.back()} title="Subscription Management" subTitle="Manage your subscriptions" />
      <div className="container-center d-flex  align-items-center flex-column">
        <h4 className="my-4">you are not subscribed to any plan, get started now</h4>
        <form action="/create-checkout-session" method="POST">
          <Card
            cover={
              <div className="text-center mt-4">
                <i className="fas fa-home fa-3x"></i>
              </div>
            }
            title="PropOpp"
            hoverable={true}
            extra={<div href="#">20 €/month</div>}
            style={{ width: 300 }}>
            <p>Find property opportunities that others miss. Our superior property search and data enhancement makes finding the next deal a breeze.</p>

            <div className="d-flex justify-content-center">
              <button type="submit" className="btn btn-primary my-2 mb-4">
                Subscribe
              </button>
            </div>
          </Card>
          <input type="hidden" name="lookup_key" value="propOpp" />
        </form>
      </div>
    </>
  );
};
