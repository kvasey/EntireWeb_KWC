import React, { Fragment } from 'react';
import Icon from 'react-native-vector-icons/Feather';
import { Button} from '../../styled/general';
import { StateComponent, Accordion } from '../../styled/components';
import {
	StatusText,
	StatusContainer,
	OrderContainer,
	OuterOrderContainer,
	HalfOrderContainer,
	PriceText,
	DataText,
	OrderContentContainer,
	AddressContainer,
	AddressContent,
	AddressLine,
	AddressLineText,
	AddressTitle
} from '../styled';
import {getById,getDate,getPrice,getStatus} from "../../util";
import { Color } from '../../../constants';

export default ({ data: { orders = [] }, error, loading, carriers: { carriers }, addresses: { addresses } }) =>
	loading || error || orders.length < 1 ? (
		<StateComponent error={error} loading={loading || orders.length < 1} />
	) : (
		<Accordion
			sections={orders}
			touchableComponent={Button}
			renderHeader={renderHeader}
			renderContent={item => renderContent(item, { carriers, addresses })}
		/>
	);

export const renderHeader = ({ id, total_paid, date_add, current_state, payment },style) => {
	const status = getStatus(current_state);
	return (
		<OrderContainer style={style}>
			<StatusContainer color={ status ? status.color : Color.secondary}>
				<StatusText>{status ? status.name: ""}</StatusText>
			</StatusContainer>
			<OuterOrderContainer>
				<HalfOrderContainer borderRightWidth="1">
					<PriceText>{`£ ${getPrice(total_paid)}`}</PriceText>
				</HalfOrderContainer>
				<HalfOrderContainer>
					<DataText>{`#${id}`}</DataText>
					<DataText>{`${getDate(date_add || new Date())}`}</DataText>
				</HalfOrderContainer>
			</OuterOrderContainer>
			<StatusContainer>
				<StatusText right>{payment}</StatusText>
			</StatusContainer>
		</OrderContainer>
	);
};

const renderContent = (
	{
		id,
		total_paid,
		date_add,
		current_state,
		payment,
		id_carrier,
		id_address_delivery,
		id_address_invoice,
		total_shipping,
		associations: { order_rows }
	},
	{ carriers, addresses }
) => {
	const carrier = getById(id_carrier, carriers);
	const addressInvoice = getById(id_address_invoice, addresses);
	const addressShipping = getById(id_address_delivery, addresses);
	return (
		<OrderContentContainer>
			{renderAddresses(addressInvoice, addressShipping)}
			{renderCarrier(carrier, total_shipping)}
			{renderProducts(order_rows)}
		</OrderContentContainer>
	);
};

export const renderAddresses = (addressInvoice, addressShipping) =>
	addressShipping || addressInvoice ? (
		<Fragment>
			<StatusContainer color="#EEE">
				<StatusText>Addresses</StatusText>
			</StatusContainer>
			<OuterOrderContainer flexDirection="column">
				{renderAddress(addressShipping, 'Shipping', true)}
				{renderAddress(addressInvoice, 'Invoice', false)}
			</OuterOrderContainer>
		</Fragment>
	) : null;

export const renderAddress = (address, title, line) =>
	address && (
		<AddressContainer line={line}>
			<AddressTitle>{title}</AddressTitle>
			<AddressContent>
				<AddressLine>
					<Icon name="map-pin" size={15} style={{ marginRight: 5 }} color={Color.main} />
					<AddressLineText>{address.address1}</AddressLineText>
				</AddressLine>
				{address.address2 ? (
					<AddressLine>
						<AddressLineText>{address.address2}</AddressLineText>
					</AddressLine>
				) : null}
				<AddressLine style={{ marginLeft: 20 }}>
					<AddressLineText>{address.city}</AddressLineText>
				</AddressLine>
				<AddressLine>
					<Icon name="phone" size={15} style={{ marginRight: 5 }} color={Color.main} />
					<AddressLineText>{address.phone || address.phone_mobile}</AddressLineText>
				</AddressLine>
			</AddressContent>
		</AddressContainer>
	);

export const renderCarrier = (carrier, shippingPrice) =>
	carrier ? (
		<Fragment>
			<StatusContainer color="#EEE">
				<StatusText>Carrier</StatusText>
			</StatusContainer>
			<OuterOrderContainer flexDirection="column">
				<AddressContainer>
					<AddressTitle>{carrier.name}</AddressTitle>
					<AddressContent>
						<AddressLine>
							<AddressLineText>{`£ ${getPrice(shippingPrice)}`}</AddressLineText>
						</AddressLine>
					</AddressContent>
				</AddressContainer>
			</OuterOrderContainer>
		</Fragment>
	) : null;

export const renderProducts = products => (
	<Fragment>
		<StatusContainer color="#EEE">
			<StatusText>Products</StatusText>
		</StatusContainer>
		<OuterOrderContainer flexDirection="column">
			{products.map(({ product_name, product_reference, product_price, product_quantity }, index) => (
				<AddressContainer key={product_reference + 1} line={products.length - 1 !== index}>
					<AddressTitle key={product_reference + 2} style={{ fontSize: 18, fontWeight: '400' }} numberOfLines={2}>
						{product_name}
					</AddressTitle>
					<AddressContent key={product_reference + 3}>
						<AddressLine key={product_reference + 4}>
							<AddressLineText key={product_reference + 5} style={{ fontSize: 14, fontWeight: '400' }}>
								{`#${product_reference}`}
							</AddressLineText>
						</AddressLine>
						<AddressLine key={product_reference + 6}>
							<AddressLineText key={product_reference + 7}>
								{`£ ${getPrice(product_price)} x${product_quantity}`}
							</AddressLineText>
						</AddressLine>
					</AddressContent>
				</AddressContainer>
			))}
		</OuterOrderContainer>
	</Fragment>
);

