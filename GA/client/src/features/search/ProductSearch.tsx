
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { FC, useEffect, useRef, useState } from 'react'
import CustomHeader from '@components/ui/CustomHeader'
import { Colors, Fonts } from '@utils/Constants'
import Icon from 'react-native-vector-icons/Ionicons'
import { RFValue } from 'react-native-responsive-fontsize'
import { searchProducts } from '@service/productService'
import ProductItem from '@features/category/ProductItem'
import { useCartStore } from '@state/cartStore'
import { goBack } from '@utils/NavigationUtils'

const ProductSearch = () => {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  
  const searchTimeout = useRef<NodeJS.Timeout>();

  const handleSearch = async (text: string) => {
    setQuery(text)
    
    if (searchTimeout.current) {
        clearTimeout(searchTimeout.current)
    }

    if (text.length > 2) {
        setLoading(true)
        searchTimeout.current = setTimeout(async () => {
            const data = await searchProducts(text)
            setResults(data)
            setLoading(false)
        }, 500)
    } else {
        setResults([])
    }
  }

  const renderItem = ({ item, index }: any) => {
    return <ProductItem item={item} index={index} />
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
            <TouchableOpacity onPress={() => goBack()}>
                <Icon name="arrow-back" size={24} color={Colors.text} />
            </TouchableOpacity>
            <View style={styles.searchBar}>
                <Icon name="search" size={20} color={Colors.text} />
                <TextInput 
                    style={styles.input}
                    placeholder="Search products..."
                    value={query}
                    onChangeText={handleSearch}
                    autoFocus
                />
                {query.length > 0 && 
                <TouchableOpacity onPress={() => handleSearch('')}>
                    <Icon name="close-circle" size={20} color="#ccc" />
                </TouchableOpacity>
                }
            </View>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color={Colors.secondary} style={{marginTop: 50}} />
      ) : (
          <FlatList
            data={results}
            renderItem={renderItem}
            keyExtractor={(item: any) => item._id}
            contentContainerStyle={styles.list}
            ListEmptyComponent={
                query.length > 2 ? (
                    <View style={styles.center}>
                        <Text style={{fontFamily: Fonts.Medium}}>No products found</Text>
                    </View>
                ) : null
            }
          />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        gap: 10,
        borderBottomWidth: 0.5,
        borderBottomColor: Colors.border
    },
    searchBar: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f2f2f2',
        borderRadius: 10,
        paddingHorizontal: 10,
        height: 45
    },
    input: {
        flex: 1,
        marginLeft: 10,
        fontFamily: Fonts.Regular,
        color: Colors.text
    },
    list: {
        padding: 10
    },
    center: {
        alignItems: 'center',
        marginTop: 50
    }
})

export default ProductSearch
