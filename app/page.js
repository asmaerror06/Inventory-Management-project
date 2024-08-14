'use client'

import { useState, useEffect } from "react";
import { firestore } from '@/firebase';
import { Box, Stack, Typography, Button, Modal, TextField } from '@mui/material'
import { collection, doc, deleteDoc, getDocs, query, getDoc, setDoc } from "firebase/firestore";

export default function Home() {
  const [inventory, setInventory] = useState([]);
  const [open, setOpen] = useState(false);
  const [itemName, setItemName] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const updateInventory = async () => {
    const snapshot = query(collection(firestore, 'inventory'));
    const docs = await getDocs(snapshot);
    const inventoryList = [];
    docs.forEach((doc) => {
      inventoryList.push({ name: doc.id, ...doc.data() });
    });
    setInventory(inventoryList);
  };

  const addItem = async (item) => {
    const docRef = doc(collection(firestore, 'inventory'), item);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const { quantity } = docSnap.data();
      await setDoc(docRef, { quantity: quantity + 1 });
    } else {
      await setDoc(docRef, { quantity: 1 });
    }
    await updateInventory();
  };

  const removeItem = async (item) => {
    const docRef = doc(collection(firestore, 'inventory'), item);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const { quantity } = docSnap.data();
      if (quantity === 1) {
        await deleteDoc(docRef);
      } else {
        await setDoc(docRef, { quantity: quantity - 1 });
      }
    }
    await updateInventory();
  };

  useEffect(() => {
    updateInventory();
  }, []);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const filteredInventory = inventory.filter(({ name }) =>
    name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box
      width="100vw"
      minheight="100vh"
      display="flex"
      justifyContent="center"
      flexDirection="column"
      alignItems="center"
      gap={2}
      sx={{ 
        backgroundColor: '#f5f5f5', 
        padding: { xs: 2, sm: 4 },

      }}
    >
      <Modal open={open} onClose={handleClose}>
        <Box
          position="absolute"
          top="50%"
          left="50%"
          width={{ xs: '90%', sm: 400 }}
          bgcolor="#F5F5F5"
          border="2px solid #5F6F65"
          boxShadow={24}
          p={4}
          display="flex"
          flexDirection="column"
          gap={3}
          sx={{
            transform: 'translate(-50%, -50%)',
            borderRadius: 2,
          }}
        >
          <Typography variant="h6" color="#000" textAlign="center">
            Add Item
          </Typography>
          <Stack width="100%" direction="row" spacing={2}>
            <TextField
              variant="outlined"
              fullWidth
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
              placeholder="Enter item name"
              sx={{
                backgroundColor: '#fff',
                borderRadius: 1,
              }}
            />
            <Button
              variant="contained"
              onClick={() => {
                addItem(itemName);
                setItemName('');
                handleClose();
              }}
              sx={{
                bgcolor: '#5F6F65',
                color: '#fff',
                '&:hover': { bgcolor: '#fff', color: '#5F6F65' },
              }}
            >
              Add
            </Button>
          </Stack>
        </Box>
      </Modal>

      <Button
        variant="contained"
        onClick={handleOpen}
        sx={{
          bgcolor: '#5F6F65',
          color: '#fff',
          '&:hover': { bgcolor: '#fff', color: '#5F6F65' },
          width: { xs: '100%', sm: 'auto' },
          maxWidth: 300,
        }}
      >
        Add New Item
      </Button>

      <TextField
        variant="outlined"
        placeholder="Search items..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        fullWidth
        margin="normal"
        sx={{
          maxWidth: 800,
          width: '100%',
          backgroundColor: '#fff',
          borderRadius: 1,
        }}
      />

      <Box
        border={'1px solid #333'}
        width="100%"
        maxWidth={800}
        borderRadius={2}
        sx={{
          backgroundColor: '#fafafa',
          boxShadow: 3,
          overflow: 'auto',
        }}
      >
        <Box
          width="100%"
          height="80px"
          display={'flex'}
          justifyContent={'center'}
          alignItems={'center'}
          sx={{
            borderRadius: '8px 8px 0 0',
            boxShadow: 1,
          }}
        >
          <Typography variant={'h4'} color={'#000'} fontSize={'3rem'} textAlign={'center'}>
            Inventory Items
          </Typography>
        </Box>
        <Stack
          width="100%"
          spacing={2}
          sx={{
            padding: { xs: 1, sm: 2 },
            maxheight: 400,
            overflow : 'auto',
            backgroundColor: '#C9DABF',
            borderRadius: '0 0 8px 8px',
          }}
        >
          {filteredInventory.length > 0 ? (
            filteredInventory.map(({ name, quantity }) => (
              <Box
                key={name}
                width="100%"
                minHeight="100px"
                display="flex"
                flexDirection= {{ xs: 'column', sm: 'row' }}
                justifyContent="space-between"
                alignItems={{ xs: 'flex-start', sm: 'center' }}
                bgcolor="#fff"
                paddingX={5}
                sx={{
                  borderRadius: 2,
                  boxShadow: 1,
                  paddingY: 2,
                }}
              >
                <Typography
                  variant={'h4'}
                  color={'#000'}
                  textAlign={{ xs: 'left', sm: 'center' }}
                >
                  {name.charAt(0).toUpperCase() + name.slice(1)}
                </Typography>
                <Typography
                  variant={'h5'}
                  color={'#000'}
                  textAlign={{ xs: 'left', sm: 'center' }}
                  sx={{ marginTop: { xs: 1, sm: 0 } }}
                >
                  Quantity: {quantity}
                </Typography>
                <Button
                  variant="contained"
                  onClick={() => removeItem(name)}
                  sx={{
                    bgcolor: '#5F6F65',
                    color: '#fff',
                    '&:hover': { bgcolor: '#fff', color: '#5F6F65' },
                    marginTop: { xs: 2, sm: 0 },
                    width: { xs: '100%', sm: 'auto' },
                    maxWidth: 200,
                  }}
                 
                >
                  Remove
                </Button>
              </Box>
            ))
          ) : (
            <Typography
              variant={'h6'}
              color={'#000'}
              textAlign={'center'}                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           
              sx={{ padding: 2 }}
            >
              No items match your search.
            </Typography>
          )}
        </Stack>
      </Box>
    </Box>
  );
}
