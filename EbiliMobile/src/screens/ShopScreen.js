import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  TextInput as RNTextInput,
  RefreshControl,
  ActivityIndicator
} from 'react-native';
import { Card, Button, Chip, Searchbar, IconButton, Badge } from 'react-native-paper';
import api from '../api/api';

const ShopScreen = ({ navigation }) => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [cartCount, setCartCount] = useState(0);
  const [page, setPage] = useState(1);
  const [hasMorePages, setHasMorePages] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  const fetchProducts = async (pageNum = 1, refresh = false) => {
    try {
      if (refresh) {
        setLoading(true);
        setPage(1);
        pageNum = 1;
      } else if (pageNum > 1) {
        setLoadingMore(true);
      }

      let url = `/products?page=${pageNum}`;
      
      if (selectedCategory) {
        url += `&category_id=${selectedCategory}`;
      }
      
      if (searchQuery) {
        url += `&search=${searchQuery}`;
      }

      const response = await api.get(url);
      
      if (refresh || pageNum === 1) {
        setProducts(response.data.data);
      } else {
        setProducts([...products, ...response.data.data]);
      }
      
      setHasMorePages(response.data.current_page < response.data.last_page);
      setPage(response.data.current_page);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
      setLoadingMore(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await api.get('/categories');
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const fetchCartCount = async () => {
    try {
      const response = await api.get('/cart/count');
      setCartCount(response.data.count);
    } catch (error) {
      console.error('Error fetching cart count:', error);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
    fetchCartCount();
  }, []);

  useEffect(() => {
    fetchProducts(1, true);
  }, [selectedCategory, searchQuery]);

  const onRefresh = () => {
    setRefreshing(true);
    fetchProducts(1, true);
    fetchCategories();
    fetchCartCount();
  };

  const handleLoadMore = () => {
    if (hasMorePages && !loadingMore) {
      fetchProducts(page + 1);
    }
  };

  const handleCategorySelect = (categoryId) => {
    setSelectedCategory(categoryId === selectedCategory ? null : categoryId);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleAddToCart = async (productId) => {
    try {
      await api.post('/cart/add', { product_id: productId, quantity: 1 });
      fetchCartCount();
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  const renderProductItem = ({ item }) => (
    <Card style={styles.productCard}>
      <TouchableOpacity
        onPress={() => navigation.navigate('ProductDetail', { productId: item.id, title: item.name })}
      >
        <Card.Cover 
          source={{ uri: item.image_url }} 
          style={styles.productImage}
          resizeMode="cover"
        />
      </TouchableOpacity>
      <Card.Content>
        <Text style={styles.productName} numberOfLines={2}>{item.name}</Text>
        <Text style={styles.productPrice}>₱{parseFloat(item.price).toFixed(2)}</Text>
      </Card.Content>
      <Card.Actions>
        <Button 
          mode="contained" 
          onPress={() => handleAddToCart(item.id)}
          style={styles.addToCartButton}
          labelStyle={styles.buttonLabel}
        >
          Add to Cart
        </Button>
      </Card.Actions>
    </Card>
  );

  const renderFooter = () => {
    if (!loadingMore) return null;
    return (
      <View style={styles.loadingMore}>
        <ActivityIndicator size="small" color="#007bff" />
        <Text style={styles.loadingMoreText}>Loading more products...</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header with search and cart */}
      <View style={styles.header}>
        <Searchbar
          placeholder="Search products..."
          onChangeText={handleSearch}
          value={searchQuery}
          style={styles.searchBar}
        />
        <TouchableOpacity 
          style={styles.cartButton}
          onPress={() => navigation.navigate('Cart')}
        >
          <IconButton icon="cart" size={24} color="#007bff" />
          {cartCount > 0 && (
            <Badge style={styles.cartBadge}>{cartCount}</Badge>
          )}
        </TouchableOpacity>
      </View>

      {/* Categories horizontal scroll */}
      <View style={styles.categoriesContainer}>
        <FlatList
          horizontal
          data={categories}
          keyExtractor={(item) => item.id.toString()}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <Chip
              mode="outlined"
              selected={selectedCategory === item.id}
              onPress={() => handleCategorySelect(item.id)}
              style={[
                styles.categoryChip,
                selectedCategory === item.id && styles.selectedCategoryChip
              ]}
              textStyle={[
                styles.categoryChipText,
                selectedCategory === item.id && styles.selectedCategoryChipText
              ]}
            >
              {item.name}
            </Chip>
          )}
          contentContainerStyle={styles.categoriesList}
        />
      </View>

      {/* Products grid */}
      {loading && !refreshing ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#007bff" />
          <Text style={styles.loadingText}>Loading products...</Text>
        </View>
      ) : (
        <FlatList
          data={products}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderProductItem}
          numColumns={2}
          contentContainerStyle={styles.productsList}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.5}
          ListFooterComponent={renderFooter}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No products found</Text>
            </View>
          }
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#fff',
    elevation: 2,
  },
  searchBar: {
    flex: 1,
    marginRight: 10,
    backgroundColor: '#f0f0f0',
  },
  cartButton: {
    position: 'relative',
  },
  cartBadge: {
    position: 'absolute',
    top: -5,
    right: -5,
  },
  categoriesContainer: {
    backgroundColor: '#fff',
    paddingVertical: 10,
    marginBottom: 5,
    elevation: 1,
  },
  categoriesList: {
    paddingHorizontal: 10,
  },
  categoryChip: {
    marginRight: 8,
    backgroundColor: '#fff',
  },
  selectedCategoryChip: {
    backgroundColor: '#007bff',
  },
  categoryChipText: {
    color: '#333',
  },
  selectedCategoryChipText: {
    color: '#fff',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    color: '#666',
  },
  productsList: {
    padding: 8,
  },
  productCard: {
    flex: 1,
    margin: 8,
    elevation: 2,
  },
  productImage: {
    height: 150,
  },
  productName: {
    fontSize: 14,
    marginTop: 8,
    marginBottom: 4,
    height: 40,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007bff',
  },
  addToCartButton: {
    marginTop: 5,
    backgroundColor: '#007bff',
  },
  buttonLabel: {
    fontSize: 12,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
  },
  loadingMore: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  loadingMoreText: {
    marginLeft: 10,
    color: '#666',
  },
});

export default ShopScreen;