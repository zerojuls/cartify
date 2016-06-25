import { Component, OnInit, Input } from '@angular/core';
import { ROUTER_DIRECTIVES, Router } from '@angular/router-deprecated';

import { IShopItem } from '../shop-item.interface';
import { ShopService } from '../shop.service';
import { ShopItemFilterPipe } from './shop-item-filter.pipe';
import { FormComponent } from '../shop-item-form/shop-item-form.component';
import { CartService } from '../../cart/cart.service';
import { AuthService } from '../../shared/auth.service';
import { Observable } from 'rxjs/Observable';


@Component({
	selector: 'list-item',
	templateUrl: 'app/shop/shop-item-list/shop-item-list.component.html',
	styleUrls: ['app/shop/shop-item-list/shop-item-list.component.css'],
	pipes: [ShopItemFilterPipe],
	directives: [FormComponent, ROUTER_DIRECTIVES],
	providers: [ShopService, CartService]
})
export class ShopItemListComponent implements OnInit {
	modalIdentifier: string = 'shopItemModal';
	filterBy: string;
	customerId: string;
	customerCartItems = {};
	shopItems: IShopItem[];

	constructor(private shop: ShopService, private auth: AuthService, private cart: CartService) { }

	getShopItems(event: boolean): void {
		this.shop.getShopItems().subscribe(
			shopItems => this.shopItems = shopItems,
			error => console.log(error))
	}

	ngOnInit(): void {
		this.customerId = AuthService.getUser();
		this.cart.getCartItems().subscribe(
			cartItems => {
				for (let cartItem of cartItems) {
					this.customerCartItems[cartItem.itemId] = cartItem.quantity
				}
				this.getShopItems(true);
			},
			error => console.log(error));
	}

	addToCart(item: any): void {
		this.cart.addOrUpdateCartItem(item, function(service, item) {
			service.addCartItem(item).subscribe(
				items => console.log("Added to Cart"),
				error => console.log(error));
		})
	}
}
