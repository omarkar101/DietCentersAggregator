import React from 'react';
import {Button, Col, Container, Form, Row} from "react-bootstrap";

const TrackOrder = () => {

    return (
        <><link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" />
        <div class="col-xl-4">
            <div class="card">
                <div class="card-body">
                    <h4 class="header-title mb-4">Product Traking</h4>
                    <ul class="list-unstyled activity-wid mb-0">
                        <li class="activity-list activity-border">
                            <div class="activity-icon avatar-sm">
                                <img src="https://bootdey.com/img/Content/avatar/avatar1.png" class="avatar-sm rounded-circle" alt=""/>
                                </div>
                            <div class="media">
                                <div class="me-3">
                                    <h5 class="font-size-15 mb-1">Your Manager Posted</h5>
                                    <p class="text-muted font-size-14 mb-0">James Raphael</p>
                                </div>

                                <div class="media-body">
                                    <div class="text-end d-none d-md-block">
                                        <p class="text-muted font-size-13 mt-2 pt-1 mb-0"><i class="fa fa-calendar font-size-15 text-primary"></i>
                                            3 days</p>
                                    </div>
                                </div>

                            </div>
                        </li>

                        <li class="activity-list activity-border">
                            <div class="activity-icon avatar-sm">
                                <span class="avatar-title bg-soft-primary text-primary rounded-circle">
                                    <i class="fa fa-shopping-cart font-size-16"></i>
                                </span>
                            </div>
                            <div class="media">
                                <div class="me-3">
                                    <h5 class="font-size-15 mb-1">You have 5 pending order.</h5>
                                    <p class="text-muted font-size-14 mb-0">America</p>
                                </div>

                                <div class="media-body">
                                    <div class="text-end d-none d-md-block">
                                        <p class="text-muted font-size-13 mt-2 pt-1 mb-0"><i class="fa fa-calendar font-size-15 text-primary"></i>
                                            1 days</p>
                                    </div>
                                </div>


                            </div>
                        </li>

                        <li class="activity-list activity-border">
                            <div class="activity-icon avatar-sm">
                                <span class="avatar-title bg-soft-success text-success rounded-circle">
                                    <i class="fa fa-user font-size-16"></i>
                                </span>
                            </div>
                            <div class="media">
                                <div class="me-3">
                                    <h5 class="font-size-15 mb-1">New Order Received</h5>
                                    <p class="text-muted font-size-14 mb-0">Thank You</p>
                                </div>

                                <div class="media-body">
                                    <div class="text-end d-none d-md-block">
                                        <p class="text-muted font-size-13 mt-2 pt-1 mb-0"><i class="fa fa-calendar font-size-15 text-primary"></i>
                                            Today</p>
                                    </div>
                                </div>
                            </div>
                        </li>

                        <li class="activity-list activity-border">
                            <div class="activity-icon avatar-sm">

                                <img src="https://bootdey.com/img/Content/avatar/avatar6.png" class="avatar-sm rounded-circle" alt="" />

                                </div>
                            <div class="media">
                                <div class="me-3">
                                    <h5 class="font-size-15 mb-1">Your Manager Posted</h5>
                                    <p class="text-muted font-size-14 mb-0">James Raphael</p>
                                </div>

                                <div class="media-body">
                                    <div class="text-end d-none d-md-block">
                                        <p class="text-muted font-size-13 mt-2 pt-1 mb-0"><i class="fa fa-calendar font-size-15 text-primary"></i>
                                            3 days</p>
                                    </div>
                                </div>

                            </div>
                        </li>

                        <li class="activity-list activity-border">
                            <div class="activity-icon avatar-sm">
                                <span class="avatar-title bg-soft-primary text-primary rounded-circle">
                                    <i class="fa fa-shopping-cart font-size-16"></i>
                                </span>
                            </div>
                            <div class="media">
                                <div class="me-3">
                                    <h5 class="font-size-15 mb-1">You have 1 pending order.</h5>
                                    <p class="text-muted font-size-14 mb-0">Dubai</p>
                                </div>

                                <div class="media-body">
                                    <div class="text-end d-none d-md-block">
                                        <p class="text-muted font-size-13 mt-2 pt-1 mb-0"><i class="fa fa-calendar font-size-15 text-primary"></i>
                                            1 days</p>
                                    </div>
                                </div>

                            </div>
                        </li>

                        <li class="activity-list">
                            <div class="activity-icon avatar-sm">
                                <span class="avatar-title bg-soft-success text-success rounded-circle">
                                    <i class="fa fa-user font-size-16"></i>
                                </span>
                            </div>
                            <div class="media">
                                <div class="me-3">
                                    <h5 class="font-size-15 mb-1">New Order Received</h5>
                                    <p class="text-muted font-size-14 mb-0">Thank You</p>
                                </div>

                                <div class="media-body">
                                    <div class="text-end d-none d-md-block">
                                        <p class="text-muted font-size-13 mt-2 pt-1 mb-0"><i class="fa fa-calendar font-size-15 text-primary"></i>
                                            Today</p>
                                    </div>
                                </div>
                            </div>
                        </li>


                    </ul>

                </div>
            </div>
        </div></>
    );
};

export default TrackOrder