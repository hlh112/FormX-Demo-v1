let schema = [
    {
        extractorType: 'Receipt',
        PreTrainedFields : [
            {field_name: 'merchant_name', default_field_name: 'merchant_name', field_status: true},
            {field_name: 'total_amount', default_field_name: 'total_amount', field_status: true},
            {field_name: 'date', default_field_name: 'date', field_status: true},
            {field_name: 'address', default_field_name: 'address', field_status: false},
            {field_name: 'mall_name', default_field_name: 'mall_name', field_status: false},
            {field_name: 'reference_number', default_field_name: 'reference_number', field_status: false},
            {field_name: 'store_number', default_field_name: 'store_number', field_status: true},
            {field_name: 'payment_method', default_field_name: 'payment_method', field_status: false}
        ],
        CustomFields : [
        ],
    },
    {
        extractorType: 'Credit Card Slip',
        PreTrainedFields : [
            {field_name: 'merchant_name', default_field_name: 'merchant_name', field_status: false},
            {field_name: 'total_amount', default_field_name: 'total_amount', field_status: true},
            {field_name: 'date', default_field_name: 'date', field_status: true},
            {field_name: 'address', default_field_name: 'address', field_status: false},
            {field_name: 'unit_price', default_field_name: 'unit_price', field_status: false},
            {field_name: 'mall_name', default_field_name: 'mall_name', field_status: false},
            {field_name: 'reference_number', default_field_name: 'reference_number', field_status: false},
            {field_name: 'product_name', default_field_name: 'product_name', field_status: false},
            {field_name: 'store_number', default_field_name: 'store_number', field_status: false},
            {field_name: 'payment_method', default_field_name: 'payment_method', field_status: false}
        ],
        CustomFields : [
        ],
    },
    {
        extractorType: 'Digital Payment Slip',
        PreTrainedFields : [
            {field_name: 'merchant_name', default_field_name: 'merchant_name', field_status: false},
            {field_name: 'total_amount', default_field_name: 'total_amount', field_status: true},
            {field_name: 'date', default_field_name: 'date', field_status: true},
            {field_name: 'address', default_field_name: 'address', field_status: false},
            {field_name: 'unit_price', default_field_name: 'unit_price', field_status: false},
            {field_name: 'mall_name', default_field_name: 'mall_name', field_status: false},
            {field_name: 'reference_number', default_field_name: 'reference_number', field_status: false},
            {field_name: 'product_name', default_field_name: 'product_name', field_status: false},
            {field_name: 'store_number', default_field_name: 'store_number', field_status: false},
            {field_name: 'payment_method', default_field_name: 'payment_method', field_status: false}
        ],
        CustomFields : [
        ],
    },
    {
        extractorType: 'Invoice',
        PreTrainedFields : [
            {field_name: 'total_amount', default_field_name: 'bank_name', field_status: true},
            {field_name: 'reference_number', default_field_name: 'reference_number', field_status: false},
            {field_name: 'due_date', default_field_name: 'due_date', field_status: false},
            {field_name: 'customer_address', default_field_name: 'customer_address', field_status: false},
            {field_name: 'invoice_number', default_field_name: 'invoice_number', field_status: true},
            {field_name: 'invoice_date', default_field_name: 'invoice_date', field_status: true},
            {field_name: 'bank_name', default_field_name: 'bank_name', field_status: false},
        ],
        CustomFields : [
        ],
    },
    {
        extractorType: 'Bank Statement',
        PreTrainedFields : [
            {field_name: 'total_amount', default_field_name: 'bank_name', field_status: true},
            {field_name: 'reference_number', default_field_name: 'reference_number', field_status: true},
            {field_name: 'due_date', default_field_name: 'due_date', field_status: false},
            {field_name: 'customer_address', default_field_name: 'customer_address', field_status: false},
            {field_name: 'invoice_number', default_field_name: 'invoice_number', field_status: false},
            {field_name: 'invoice_date', default_field_name: 'invoice_date', field_status: true},
            {field_name: 'bank_name', default_field_name: 'bank_name', field_status: true},
        ],
        CustomFields : [
        ],
    },
    {
        extractorType: 'ID card',
        PreTrainedFields : [
            {field_name: 'full_name_chinese', default_field_name: 'full_name_chinese', field_status: true},
            {field_name: 'full_name_english', default_field_name: 'bank_name_english', field_status: true},
            {field_name: 'date_of_birth', default_field_name: 'date_of_birth', field_status: true},
            {field_name: 'expiry_date', default_field_name: 'expiry_date', field_status: true},
            {field_name: 'gender', default_field_name: 'gender', field_status: true},
            {field_name: 'nationality', default_field_name: 'nationality', field_status: true},
            {field_name: 'address', default_field_name: 'address', field_status: false}
        ],
        CustomFields : [
        ],
    },
    {
        extractorType: 'Passport',
        PreTrainedFields : [
            {field_name: 'full_name_chinese', default_field_name: 'full_name_chinese', field_status: true},
            {field_name: 'full_name_english', default_field_name: 'bank_name_english', field_status: true},
            {field_name: 'date_of_birth', default_field_name: 'date_of_birth', field_status: true},
            {field_name: 'expiry_date', default_field_name: 'expiry_date', field_status: true},
            {field_name: 'gender', default_field_name: 'gender', field_status: true},
            {field_name: 'nationality', default_field_name: 'nationality', field_status: true},
            {field_name: 'address', default_field_name: 'address', field_status: false}
        ],
        CustomFields : [
        ],
    },
    {
        extractorType: 'Address Proof',
        PreTrainedFields : [
            {field_name: 'full_name_chinese', default_field_name: 'full_name_chinese', field_status: true},
            {field_name: 'full_name_english', default_field_name: 'bank_name_english', field_status: true},
            {field_name: 'date_of_birth', default_field_name: 'date_of_birth', field_status: true},
            {field_name: 'expiry_date', default_field_name: 'expiry_date', field_status: true},
            {field_name: 'gender', default_field_name: 'gender', field_status: true},
            {field_name: 'nationality', default_field_name: 'nationality', field_status: true},
            {field_name: 'address', default_field_name: 'address', field_status: true}

        ],
        CustomFields : [
        ],
    },
    {
        extractorType: 'Bill of Lading',
        PreTrainedFields : [
            {field_name: 'bill_number', default_field_name: 'bill_number', field_status: true},
            {field_name: 'ship_date', default_field_name: 'ship_date', field_status: true},
            {field_name: 'shipper_city', default_field_name: 'shipper_city', field_status: true},
            {field_name: 'shipper_email', default_field_name: 'shipper_email', field_status: true},
            {field_name: 'carrier_name', default_field_name: 'carrier_name', field_status: true},
            {field_name: 'carrier_number', default_field_name: 'carrier_number', field_status: true},
            {field_name: 'shipment_reference', default_field_name: 'shipment_reference', field_status: false},
            {field_name: 'shipper_address', default_field_name: 'shipper_address', field_status: false}
        ],
        CustomFields : [
        ],
    },
    {
        extractorType: 'Airway Bill',
        PreTrainedFields : [
            {field_name: 'bill_number', default_field_name: 'bill_number', field_status: false},
            {field_name: 'ship_date', default_field_name: 'ship_date', field_status: true},
            {field_name: 'shipper_city', default_field_name: 'shipper_city', field_status: true},
            {field_name: 'shipper_email', default_field_name: 'shipper_email', field_status: true},
            {field_name: 'carrier_name', default_field_name: 'carrier_name', field_status: true},
            {field_name: 'carrier_number', default_field_name: 'carrier_number', field_status: true},
            {field_name: 'shipment_reference', default_field_name: 'shipment_reference', field_status: true},
            {field_name: 'shipper_address', default_field_name: 'shipper_address', field_status: true}
        ],
        CustomFields : [
        ],
    },
    {
        extractorType: 'Shipment Label',
        PreTrainedFields : [
            {field_name: 'bill_number', default_field_name: 'bill_number', field_status: false},
            {field_name: 'ship_date', default_field_name: 'ship_date', field_status: true},
            {field_name: 'shipper_city', default_field_name: 'shipper_city', field_status: true},
            {field_name: 'shipper_email', default_field_name: 'shipper_email', field_status: true},
            {field_name: 'carrier_name', default_field_name: 'carrier_name', field_status: true},
            {field_name: 'carrier_number', default_field_name: 'carrier_number', field_status: true},
            {field_name: 'shipment_reference', default_field_name: 'shipment_reference', field_status: true},
            {field_name: 'shipper_address', default_field_name: 'shipper_address', field_status: true}
        ],
        CustomFields : [
        ],
    },
    {
        extractorType: 'Business Registration',
        PreTrainedFields : [
            {field_name: 'company_name', default_field_name: 'company_name', field_status: true},
            {field_name: 'date_of_commencement', default_field_name: 'date_of_commencement', field_status: true},
            {field_name: 'expiry_date', default_field_name: 'expiry_date', field_status: true},
            {field_name: 'address', default_field_name: 'address', field_status: true},
            {field_name: 'business_nature', default_field_name: 'business_nature', field_status: true},
            {field_name: 'cert_number', default_field_name: 'cert_number', field_status: true}
        ],
        CustomFields : [
        ],
    },
    {
        extractorType: 'Food License',
        PreTrainedFields : [
            {field_name: 'company_name', default_field_name: 'company_name', field_status: true},
            {field_name: 'date_of_commencement', default_field_name: 'date_of_commencement', field_status: true},
            {field_name: 'expiry_date', default_field_name: 'expiry_date', field_status: true},
            {field_name: 'address', default_field_name: 'address', field_status: true},
            {field_name: 'business_nature', default_field_name: 'business_nature', field_status: true},
            {field_name: 'cert_number', default_field_name: 'cert_number', field_status: true}
        ],
        CustomFields : [
        ],
    },
    {
        extractorType: 'Custom',
        PreTrainedFields : [],
        CustomFields : [
            {field_name: 'movie_name', field_type: 'single-line text'},
            {field_name: 'cinema_name', field_type: 'single-line text'},
            {field_name: 'date', field_type: 'date'},
            {field_name: 'time', field_type: 'time'},
            {field_name: 'house', field_type: 'single-line text'},
            {field_name: 'seat', field_type: 'single-line text'},
        ],
    }
]

export function getPreTrainedSchema() {
    return schema;
  }