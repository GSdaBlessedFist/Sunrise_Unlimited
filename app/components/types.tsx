export type StoreFrontEntityType = {
    id: string;
    brand: {
        name: string;
        siteUrl: string;
        spotColors?: {};
    };
    startDate: string;
    tags: string[];
    assets: {
        sceneUrl: string;
    };
    owner: OwnerType;
    subscriptionTier: SubscriptionTierType;
    workOrders: WorkOrderType[];
}

export type OwnerType = {
    name: string;
    store: string;
    contactInfo: ContactInfoType;
}

export type ContactInfoType = {
    name: string;
    email: string;
};

export type SubscriptionTierType = {
    tier: string;
    frequency: string;
}

export type WorkOrderType = {
    wo_description: string;
    wo_id: string;
    status: WorkOrderStatus;
    totalInvoiceAmount: number;
    worked_with: string;
    dateStart: string;
    dateCompleted: string;
};

export enum WorkOrderStatus {
    Pending = "PENDING",
    InProgress = "IN_PROGRESS",
    Completed = "COMPLETED"
}
