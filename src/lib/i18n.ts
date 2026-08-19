import type { LangCode } from "./types";

const translations: Record<string, { en: string; ar: string }> = {
  // Navigation
  "nav.home": { en: "Home", ar: "الرئيسية" },
  "nav.shop": { en: "Shop", ar: "المتجر" },
  "nav.dog": { en: "Dog", ar: "الكلاب" },
  "nav.cat": { en: "Cat", ar: "القطط" },
  "nav.birds": { en: "Birds", ar: "الطيور" },
  "nav.fish": { en: "Fish", ar: "الأسماك" },
  "nav.small_pets": { en: "Small Pets", ar: "الحيوانات الصغيرة" },
  "nav.shop_by_need": { en: "Shop By Need", ar: "تسوق حسب الحاجة" },

  // Mega Menu subcategories
  "mega.food": { en: "Food", ar: "الطعام" },
  "mega.treats": { en: "Treats", ar: "الوجبات الخفيفة" },
  "mega.accessories": { en: "Accessories", ar: "اكسسوارات" },
  "mega.litter": { en: "Litter", ar: "التراب" },
  "mega.toys": { en: "Toys", ar: "الألعاب" },
  "mega.beds": { en: "Beds & Houses", ar: "الأسرّة والبيوت" },
  "mega.carrier": { en: "Carrier & Travel", ar: "حقائب السفر" },
  "mega.healthcare": { en: "Healthcare", ar: "الرعاية الصحية" },
  "mega.grooming": { en: "Grooming", ar: "العناية والنظافة" },
  "mega.special_offer": { en: "Special Offers", ar: "عروض خاصة" },
  "mega.all_brands": { en: "Shop All Brands", ar: "تسوق جميع العلامات التجارية" },
  "mega.best_sellers": { en: "Best Sellers", ar: "الأكثر مبيعاً" },

  // Dog subcats
  "mega.dog_dry_food": { en: "Dry Food", ar: "طعام جاف" },
  "mega.dog_wet_food": { en: "Wet Food", ar: "طعام رطب" },
  "mega.dog_treats": { en: "Treats", ar: "مكافآت" },
  "mega.dog_accessories": { en: "Accessories", ar: "اكسسوارات" },
  "mega.dog_toys": { en: "Toys", ar: "ألعاب" },

  // Cat subcats
  "mega.cat_dry_food": { en: "Dry Food", ar: "طعام جاف" },
  "mega.cat_wet_food": { en: "Wet Food", ar: "طعام رطب" },
  "mega.cat_treats": { en: "Treats", ar: "مكافآت" },
  "mega.cat_litter": { en: "Litter & Boxes", ar: "تراب وصناديق" },
  "mega.cat_accessories": { en: "Accessories", ar: "اكسسوارات" },
  "mega.cat_toys": { en: "Toys", ar: "ألعاب" },
  "mega.cat_scratchers": { en: "Scratchers", ar: "خداشات" },

  // Bird subcats
  "mega.bird_food": { en: "Bird Food", ar: "طعام الطيور" },
  "mega.bird_toys": { en: "Bird Toys", ar: "ألعاب الطيور" },
  "mega.bird_cage": { en: "Bird Cages", ar: "أقفاص الطيور" },
  "mega.bird_accessories": { en: "Accessories", ar: "اكسسوارات" },

  // Fish subcats
  "mega.fish_food": { en: "Fish Food", ar: "طعام الأسماك" },
  "mega.fish_accessories": { en: "Accessories", ar: "اكسسوارات الأسماك" },

  // Small pet subcats
  "mega.rabbit": { en: "Rabbit", ar: "الأرانب" },
  "mega.hamster": { en: "Hamster", ar: "الهامستر" },
  "mega.reptile": { en: "Reptile", ar: "الزواحف" },
  "mega.cages": { en: "Cages", ar: "الأقفاص" },

  // Shop by need subcats
  "mega.pet_beds": { en: "Pet Beds & Houses", ar: "أسرّة وبيوت" },
  "mega.pet_milk": { en: "Pet Milk", ar: "حليب الحيوانات" },
  "mega.healthcare_supplements": { en: "Healthcare & Supplements", ar: "الرعاية الصحية والمكملات" },
  "mega.grooming_hygiene": { en: "Grooming & Hygiene", ar: "العناية والنظافة" },
  "mega.carrier_travel": { en: "Carrier & Travel Bags", ar: "حقائب السفر والنقل" },
  "mega.special_offers": { en: "Special Offers", ar: "عروض خاصة" },

  // Header
  "header.search": { en: "Search for products...", ar: "ابحث عن المنتجات..." },
  "header.search_placeholder": { en: "Search products, brands and more...", ar: "ابحث عن المنتجات والعلامات التجارية..." },
  "header.wishlist": { en: "Wishlist", ar: "المفضلة" },
  "header.cart": { en: "Cart", ar: "السلة" },
  "header.account": { en: "Account", ar: "الحساب" },
  "header.language": { en: "English", ar: "العربية" },

  // Announcement Bar
  "announce.line1": { en: "Kuwait's #1 Online Pet Store", ar: "أول متجر حيوانات أليفة أونلاين في الكويت" },
  "announce.line2": { en: "Free delivery on orders over KD 10!", ar: "توصيل مجاني للطلبات فوق 10 د.ك!" },
  "announce.line3": { en: "Exclusive deals on top pet brands!", ar: "عروض حصرية على أفضل علامات الحيوانات!" },

  // Home
  "home.shop_by_category": { en: "Shop by Category", ar: "تسوق حسب الفئة" },
  "home.shop_by_brands": { en: "Shop by Popular Brands", ar: "تسوق حسب العلامات التجارية" },
  "home.explore_categories": { en: "Explore Pet Food Categories", ar: "استكشف فئات طعام الحيوانات" },
  "home.featured_products": { en: "Featured Products", ar: "منتجات مميزة" },
  "home.view_all": { en: "View All", ar: "عرض الكل" },
  "home.trust_title": { en: "Why Shop With Us?", ar: "لماذا تتسوق معنا؟" },
  "home.trust_support": { en: "24/7 Support", ar: "دعم على مدار الساعة" },
  "home.trust_support_desc": { en: "WhatsApp us anytime", ar: "تواصل معنا عبر واتساب" },
  "home.trust_delivery": { en: "Fast Delivery", ar: "توصيل سريع" },
  "home.trust_delivery_desc": { en: "Same day delivery available", ar: "توصيل في نفس اليوم" },
  "home.trust_returns": { en: "Easy Returns", ar: "مرتجعات سهلة" },
  "home.trust_returns_desc": { en: "Hassle-free returns", ar: "مرتجعات بدون تعقيد" },
  "home.trust_secure": { en: "Secure Payment", ar: "دفع آمن" },
  "home.trust_secure_desc": { en: "Pay on delivery or online", ar: "ادفع عند التوصيل أو أونلاين" },
  "home.shop_dog": { en: "Shop Dog", ar: "تسوق للكلاب" },
  "home.shop_cat": { en: "Shop Cat", ar: "تسوق للقطط" },
  "home.dog_food": { en: "Top Selling Dog Food", ar: "أفضل طعام كلاب يُباع" },
  "home.cat_food": { en: "Top Selling Cat Food", ar: "أفضل طعام قطط يُباع" },
  "home.puppy_food": { en: "Puppy Food", ar: "طعام الجراء" },
  "home.adult_dog_food": { en: "Adult Dog Food", ar: "طعام كلاب بالغة" },
  "home.senior_dog_food": { en: "Senior Dog Food", ar: "طعام كلاب مسنّة" },
  "home.kitten_food": { en: "Kitten Food", ar: "طعام القطط الصغيرة" },
  "home.adult_cat_food": { en: "Adult Cat Food", ar: "طعام قطط بالغة" },
  "home.senior_cat_food": { en: "Senior Cat Food", ar: "طعام قطط مسنّة" },

  // Category page
  "category.products": { en: "products", ar: "منتج" },
  "category.no_products": { en: "No products found", ar: "لم يتم العثور على منتجات" },
  "category.clear_filters": { en: "Clear All Filters", ar: "مسح جميع الفلاتر" },
  "category.sort_by": { en: "Sort by", ar: "ترتيب حسب" },
  "category.filter": { en: "Filter", ar: "تصفية" },
  "category.price_range": { en: "Price Range", ar: "نطاق السعر" },
  "category.availability": { en: "Availability", ar: "التوفر" },
  "category.in_stock": { en: "In Stock", ar: "متوفر" },
  "category.out_of_stock": { en: "Out of Stock", ar: "غير متوفر" },
  "category.min_price": { en: "Min", ar: "الحد الأدنى" },
  "category.max_price": { en: "Max", ar: "الحد الأقصى" },

  // Sort options
  "sort.featured": { en: "Featured", ar: "مميز" },
  "sort.price_asc": { en: "Price: Low to High", ar: "السعر: من الأقل للأعلى" },
  "sort.price_desc": { en: "Price: High to Low", ar: "السعر: من الأعلى للأقل" },
  "sort.newest": { en: "Newest", ar: "الأحدث" },
  "sort.name_asc": { en: "Name: A to Z", ar: "الاسم: أ إلى ي" },
  "sort.name_desc": { en: "Name: Z to A", ar: "الاسم: ي إلى أ" },

  // Product
  "product.add_to_cart": { en: "Add to Cart", ar: "أضف إلى السلة" },
  "product.choose_options": { en: "Choose Options", ar: "اختر الخيارات" },
  "product.out_of_stock": { en: "Out of Stock", ar: "غير متوفر" },
  "product.description": { en: "Description", ar: "الوصف" },
  "product.details": { en: "Product Details", ar: "تفاصيل المنتج" },
  "product.related_products": { en: "Related Products", ar: "منتجات مشابهة" },
  "product.select_variant": { en: "Select", ar: "اختر" },
  "product.quantity": { en: "Quantity", ar: "الكمية" },
  "product.in_stock": { en: "In Stock", ar: "متوفر" },
  "product.rating": { en: "out of 5", ar: "من 5" },
  "product.reviews": { en: "reviews", ar: "تقييم" },
  "product.from_price": { en: "From", ar: "يبدأ من" },

  // Cart
  "cart.title": { en: "Shopping Cart", ar: "سلة التسوق" },
  "cart.empty": { en: "Your cart is empty", ar: "سلتك فارغة" },
  "cart.continue_shopping": { en: "Continue Shopping", ar: "متابعة التسوق" },
  "cart.subtotal": { en: "Subtotal", ar: "المجموع الفرعي" },
  "cart.shipping": { en: "Shipping", ar: "التوصيل" },
  "cart.shipping_free": { en: "Free", ar: "مجاني" },
  "cart.shipping_calculated": { en: "Calculated at checkout", ar: "يُحسب عند الدفع" },
  "cart.total": { en: "Total", ar: "الإجمالي" },
  "cart.checkout": { en: "Proceed to Checkout", ar: "إتمام الشراء" },
  "cart.remove": { en: "Remove", ar: "إزالة" },
  "cart.view_cart": { en: "View Cart", ar: "عرض السلة" },

  // Wishlist
  "wishlist.title": { en: "My Wishlist", ar: "قائمة الأمنيات" },
  "wishlist.empty": { en: "Your wishlist is empty", ar: "قائمة أمنياتك فارغة" },
  "wishlist.add_to_cart": { en: "Add to Cart", ar: "أضف إلى السلة" },
  "wishlist.remove": { en: "Remove", ar: "إزالة" },

  // Checkout
  "checkout.title": { en: "Checkout", ar: "إتمام الشراء" },
  "checkout.shipping_info": { en: "Shipping Information", ar: "معلومات التوصيل" },
  "checkout.full_name": { en: "Full Name", ar: "الاسم الكامل" },
  "checkout.phone": { en: "Phone Number", ar: "رقم الهاتف" },
  "checkout.address": { en: "Address", ar: "العنوان" },
  "checkout.area": { en: "Area", ar: "المنطقة" },
  "checkout.governorate": { en: "Governorate", ar: "المحافظة" },
  "checkout.block": { en: "Block", ar: "القطعة" },
  "checkout.street": { en: "Street", ar: "الشارع" },
  "checkout.building": { en: "Building/House", ar: "المبنى/المنزل" },
  "checkout.floor_apt": { en: "Floor/Apt", ar: "الطابق/الشقة" },
  "checkout.payment_method": { en: "Payment Method", ar: "طريقة الدفع" },
  "checkout.cash_on_delivery": { en: "Cash on Delivery", ar: "الدفع عند التوصيل" },
  "checkout.online_payment": { en: "Online Payment", ar: "الدفع الإلكتروني" },
  "checkout.place_order": { en: "Place Order", ar: "تأكيد الطلب" },
  "checkout.order_summary": { en: "Order Summary", ar: "ملخص الطلب" },

  // Footer
  "footer.about_title": { en: "About Pet Store", ar: "عن بت ستور" },
  "footer.about_text": { en: "Kuwait's trusted pet store offering premium pet food, accessories, and supplies for dogs, cats, birds, fish, and small pets.", ar: "متجر الحيوانات الأليفة الموثوق في الكويت يقدم أعلاف حيوانات فاخرة وإكسسوارات ولوازم للكلاب والقطط والطيور والأسماك والحيوانات الصغيرة." },
  "footer.quick_links": { en: "Quick Links", ar: "روابط سريعة" },
  "footer.shop_by_pet": { en: "Shop by Pet", ar: "تسوق حسب الحيوان" },
  "footer.our_services": { en: "Our Services", ar: "خدماتنا" },
  "footer.contact_us": { en: "Contact Us", ar: "تواصل معنا" },
  "footer.newsletter": { en: "Newsletter", ar: "النشرة الإخبارية" },
  "footer.newsletter_text": { en: "Subscribe for exclusive deals and updates", ar: "اشترك للحصول على عروض حصرية وتحديثات" },
  "footer.email_placeholder": { en: "Enter your email", ar: "أدخل بريدك الإلكتروني" },
  "footer.subscribe": { en: "Subscribe", ar: "اشترك" },
  "footer.view_cart": { en: "View Cart", ar: "عرض السلة" },
  "footer.wishlist": { en: "Wishlist", ar: "المفضلة" },
  "footer.about_us": { en: "About Us", ar: "من نحن" },
  "footer.contact": { en: "Contact Us", ar: "تواصل معنا" },
  "footer.delivery_info": { en: "Delivery Information", ar: "معلومات التوصيل" },
  "footer.privacy_policy": { en: "Privacy Policy", ar: "سياسة الخصوصية" },
  "footer.terms": { en: "Terms & Conditions", ar: "الشروط والأحكام" },
  "footer.all_pets": { en: "All Pets", ar: "جميع الحيوانات" },
  "footer.dogs": { en: "Dogs", ar: "الكلاب" },
  "footer.cats": { en: "Cats", ar: "القطط" },
  "footer.birds": { en: "Birds", ar: "الطيور" },
  "footer.fish": { en: "Fish", ar: "الأسماك" },
  "footer.small_pets_footer": { en: "Small Pets", ar: "الحيوانات الصغيرة" },
  "footer.follow_us": { en: "Follow Us", ar: "تابعنا" },
  "footer.rights": { en: "All rights reserved", ar: "جميع الحقوق محفوظة" },

  // Search
  "search.title": { en: "Search Results", ar: "نتائج البحث" },
  "search.no_results": { en: "No results found", ar: "لم يتم العثور على نتائج" },
  "search.try_different": { en: "Try searching with different keywords", ar: "جرب البحث بكلمات مختلفة" },
  "search.results_for": { en: "Results for", ar: "نتائج لـ" },

  // Breadcrumbs
  "breadcrumb.home": { en: "Home", ar: "الرئيسية" },

  // Trust Badges
  "badge.support": { en: "24/7 Support", ar: "دعم 24/7" },
  "badge.whatsapp_247": { en: "WhatsApp us anytime", ar: "تواصل معنا عبر واتساب" },
  "badge.free_delivery": { en: "Free Delivery", ar: "توصيل مجاني" },
  "badge.free_delivery_desc": { en: "On orders over KD 10", ar: "للطلبات فوق 10 د.ك" },
  "badge.easy_returns": { en: "Easy Returns", ar: "مرتجعات سهلة" },
  "badge.easy_returns_desc": { en: "Hassle-free returns", ar: "مرتجعات بدون تعقيد" },
  "badge.secure_payment": { en: "Secure Payment", ar: "دفع آمن" },
  "badge.secure_payment_desc": { en: "Pay on delivery or online", ar: "ادفع عند التوصيل أو أونلاين" },
  "badge.pay_on_delivery": { en: "Pay on Delivery", ar: "الدفع عند التوصيل" },
  "badge.pay_on_delivery_desc": { en: "Cash or card on delivery", ar: "نقداً أو بطاقة عند التوصيل" },

  // General
  "general.loading": { en: "Loading...", ar: "جاري التحميل..." },
  "general.error": { en: "Something went wrong", ar: "حدث خطأ ما" },
  "general.try_again": { en: "Try Again", ar: "حاول مرة أخرى" },
  "general.learn_more": { en: "Learn More", ar: "اقرأ المزيد" },
  "general.shop_now": { en: "Shop Now", ar: "تسوق الآن" },
  "general.showing": { en: "Showing", ar: "عرض" },
  "general.of": { en: "of", ar: "من" },
  "general.items": { en: "items", ar: "منتج" },
  "general.kwd": { en: "KD", ar: "د.ك" },
  "general.quantity": { en: "Qty", ar: "الكمية" },
};

export function t(key: string, lang: LangCode = "en"): string {
  const entry = translations[key];
  if (!entry) return key;
  return entry[lang] || entry.en || key;
}

export function getTranslations(lang: LangCode) {
  return (key: string) => t(key, lang);
}
