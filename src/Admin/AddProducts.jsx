import React, { useState } from 'react';
import { Container, Row, Col, Form, FormGroup } from 'reactstrap';
import { toast } from 'react-toastify';
import { db, storage } from '../firebase.config';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { addDoc, collection } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import '../styles/adminnav.css';

const AddProducts = () => {
  const [enterTitle, setEnterTitle] = useState('');
  const [enterCategory, setEnterCategory] = useState('');
  const [enterShortDesc, setEnterShortDesc] = useState('');
  const [enterDescription, setEnterDescription] = useState('');
  const [enterPrice, setEnterPrice] = useState('');
  const [enterProductImg1, setEnterProductImg1] = useState(null);
  // const [enterProductImg2, setEnterProductImg2] = useState(null);
  // const [enterProductImg3, setEnterProductImg3] = useState(null);
  // const [enterProductImg4, setEnterProductImg4] = useState(null);
  const [enterMaterial, setEnterMaterial] = useState('');
  const [enterFinish, setEnterFinish] = useState('');
  const [enterBrand, setEnterBrand] = useState('');
  const [enterWarranty, setEnterWarranty] = useState('');
  const [enterShipsIn, setEnterShipsIn] = useState('');
  const [enterDeliveryCondition, setEnterDeliveryCondition] = useState('');

  const [enterColor, setEnterColor] = useState('');              // Sofa, Dining tables, Chair
  const [enterStorage, setEnterStorage] = useState('');          // Sofa, Beds, Dining tables, Book shleves
  const [enterStorageType, setEnterStorageType] = useState('');  // Beds, TV units, Book shleves
  const [enterSeater, setEnterSeater] = useState('');            // Sofa, Dining tables
  const [enterDimension, setEnterDimension] = useState('');      // Sofa, Beds, Dining tables, TV units, Book shleves, Wardrobe, Chair
  const [enterShape, setEnterShape] = useState('');              // Sofa, Dining tables
  const [enterStyle, setEnterStyle] = useState('');              // Sofa, Beds, 
  const [enterFeatures, setEnterFeatures] = useState('');        // Sofa, Dining tables, Chair
  const [enterProductQuantity, setEnterProductQuantity] = useState('');  // Sofa, Beds, TV units, Book shleves, Wardrobe, Chair
  const [enterArmrest, setEnterArmrest] = useState('');          // Sofa, Chair
  const [enterDesigns, setEnterDesigns] = useState('');          // Sofa
  const [enterSize, setEnterSize] = useState('');                // Beds  
  const [enterProductWeight, setEnterProductWeight] = useState('');           // Beds, Dining tables, TV units
  const [enterTableTopMaterial, setEnterTableTopMaterial] = useState('');     // Dining tables
  const [enterChairDimension, setEnterChairDimension] = useState('');         // Dining tables
  const [enterUpholsteryfabric, setEnterUpholsteryFabric] = useState('');     // Dining tables
  const [enterRecommendedScreenSize, setEnterRecommendedScreenSize] = useState('');  // TV units
  const [enterNumberOfDrawers, setEnterNumberOfDrawers] = useState('');  // TV units
  const [enterWallMounting, setEnterWallMounting] = useState('');        // TV units
  const [enterNumberOfShleves, setEnterNumberOfShleves] = useState('');  // Book shleves
  const [enterLock, setEnterLock] = useState('');                        // Wardrobe
  const [enterMirror, setEnterMirror] = useState('');                    // Wardrobe
  const [enterNumberOfDoors, setEnterNumberOfDoors] = useState('');      // Wardrobe
  const [enterBackrest, setEnterBackrest] = useState('');                // Chair
  const [enterUpholsteryMaterial, setEnterUpholsteryMaterial] = useState('');  // Chair
  const [enterGSM, setEnterGSM] = useState('');          // Chair
  const [enterContent, setEnterContent] = useState('');  // Chair

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const addProduct = async (e) => {
    e.preventDefault();
    setLoading(true)

    try {
      const docRef = await collection(db, 'products');
      const storageRef = ref(storage, `productImages/${Date.now() + enterProductImg1.name}`);
      const uploadTask = uploadBytesResumable(storageRef, enterProductImg1);
      // const uploadTask = uploadBytesResumable(storageRef, enterProductImg1, enterProductImg2, enterProductImg3, enterProductImg4);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          // Progress
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
          switch (snapshot.state) {
            case 'paused':
              console.log('Upload is paused');
              break;
            case 'running':
              console.log('Upload is running');
              break;
            default:
              console.log('Default case');
          }
        },
        (error) => {
          // Error
          console.error('Upload failed:', error);
          toast.error('Image upload failed!');
        },
        () => {
          // Success
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await addDoc(docRef, {
              productName: enterTitle,
              shortDecs: enterShortDesc,
              description: enterDescription,
              category: enterCategory,
              price: enterPrice,
              imgUrl: downloadURL,

              material: enterMaterial,
              finish: enterFinish,
              brand: enterBrand,
              warranty: enterWarranty,
              shipsIn: enterShipsIn,
              deliveryCondition: enterDeliveryCondition,

              color: enterColor,
              storage: enterStorage,
              storageType: enterStorageType,
              seater: enterSeater,
              dimension: enterDimension,
              designs: enterDesigns,
              shape: enterShape,
              style: enterStyle,
              features: enterFeatures,
              productQuantity: enterProductQuantity,
              armrest: enterArmrest,
              size: enterSize,
              productWeight: enterProductWeight,
              tableTopMaterial: enterTableTopMaterial,
              chairDimension: enterChairDimension,
              UpholsteryFabric: enterUpholsteryfabric,
              recommendedScreenSize: enterRecommendedScreenSize,
              numberOfDrawers: enterNumberOfDrawers,
              wallMounting: enterWallMounting,
              numberOfShleves: enterNumberOfShleves,
              lock: enterLock,
              mirror: enterMirror,
              numberOfDoors: enterNumberOfDoors,
              backrest: enterBackrest,
              upholsteryMaterial: enterUpholsteryMaterial,
              gsm: enterGSM,
              content: enterContent,
            });
            toast.success('Product successfully added!');
          });
          navigate('/dashboard/all-products');
          setLoading(false)
        }
      );
    } catch (error) {
      console.error('Error adding product:', error);
      toast.error('Error adding product:', error);
      setLoading(false)
      // Handle error
    }
  };

  return (
    <section>
      <Container>
        <Row>
          <Col lg="12">
            {
              loading ? <h4 className='py-5 text-center'>Loading.....</h4> : <>
                <h4 className="mb-4">Add Products</h4>
                <Form onSubmit={addProduct}>
                  <FormGroup className="form-group">
                    <span>Product title</span>
                    <input type="text" placeholder="Product Name" value={enterTitle} onChange={(e) => setEnterTitle(e.target.value)} required />
                  </FormGroup>
                  <FormGroup className="form-group">
                    <span>Short Description</span>
                    <input type="text" placeholder="Short Desc....." value={enterShortDesc} onChange={(e) => setEnterShortDesc(e.target.value)} required />
                  </FormGroup>
                  <FormGroup className="form-group">
                    <span>Description</span>
                    <input type="text" placeholder="Description" value={enterDescription} onChange={(e) => setEnterDescription(e.target.value)} required />
                  </FormGroup>

                  <div className="d-flex align-items-center justify-content-between gap-5">
                    <FormGroup className="form-group w-50">
                      <span>Price</span>
                      <input type="number" placeholder="Price" value={enterPrice} onChange={(e) => setEnterPrice(e.target.value)} required />
                    </FormGroup>
                    <FormGroup className="form-group w-50">
                      <span>Category</span>
                      <select value={enterCategory} onChange={(e) => setEnterCategory(e.target.value)} required>
                        <option>Select category</option>
                        <option value="sofa">Sofa</option>
                        <option value="bed">Bed</option>
                        <option value="dining-table">Dining Tables</option>
                        <option value="TV-unit">TV Units</option>
                        <option value="book-shleves">Book Shleves</option>
                        <option value="wardrobe">Wardrobe</option>
                        <option value="chair">Chair</option>
                      </select>
                    </FormGroup>
                  </div>

                  <div>
                    <FormGroup className="form-group">
                      <span>Product Images</span>
                      <input type="file" onChange={(e) => setEnterProductImg1(e.target.files[0])} required />
                      {/* <input type="file" onChange={(e) => setEnterProductImg2(e.target.files[0])} required /> */}
                      {/* <input type="file" onChange={(e) => setEnterProductImg3(e.target.files[0])} required /> */}
                      {/* <input type="file" onChange={(e) => setEnterProductImg4(e.target.files[0])} required /> */}
                    </FormGroup>
                  </div>


                  <div>
                    <FormGroup className="form-group">
                      <span>Material</span>
                      <input type="text" placeholder="Material" value={enterMaterial} onChange={(e) => setEnterMaterial(e.target.value)} required />
                    </FormGroup>
                    <FormGroup className="form-group">
                      <span>Finish</span>
                      <input type="text" placeholder="Finish" value={enterFinish} onChange={(e) => setEnterFinish(e.target.value)} required />
                    </FormGroup>


                    {(enterCategory === "sofa") && (
                      <FormGroup className="form-group">
                        <span>Designs</span>
                        <input type="text" placeholder="Designs" value={enterDesigns} onChange={(e) => setEnterDesigns(e.target.value)} required />
                      </FormGroup>
                    )}
                    {(enterCategory === "sofa" || enterCategory === "dining-table" || enterCategory === "chair") && (
                      <FormGroup className="form-group">
                        <span>Color</span>
                        <input type="text" placeholder="Color" value={enterColor} onChange={(e) => setEnterColor(e.target.value)} required />
                      </FormGroup>
                    )}
                    {(enterCategory === "sofa" || enterCategory === "bed" || enterCategory === "dining-table" || enterCategory === "book-shleves") && (
                      <FormGroup className="form-group">
                        <span>Storage</span>
                        <input type="text" placeholder="Storage" value={enterStorage} onChange={(e) => setEnterStorage(e.target.value)} required />
                      </FormGroup>
                    )}
                    {(enterCategory === "bed" || enterCategory === "TV-unit" || enterCategory === "book-shleves") && (
                      <FormGroup className="form-group">
                        <span>Storage Type</span>
                        <input type="text" placeholder="Storage Type" value={enterStorageType} onChange={(e) => setEnterStorageType(e.target.value)} required />
                      </FormGroup>
                    )}
                    {(enterCategory === "sofa" || enterCategory === "dining-table") && (
                      <FormGroup className="form-group">
                        <span>Seater</span>
                        <input type="text" placeholder="Seater" value={enterSeater} onChange={(e) => setEnterSeater(e.target.value)} required />
                      </FormGroup>
                    )}

                    <FormGroup className="form-group">
                      <span>Dimension</span>
                      <input type="text" placeholder="Dimension" value={enterDimension} onChange={(e) => setEnterDimension(e.target.value)} required />
                    </FormGroup>

                    {(enterCategory === "sofa" || enterCategory === "dining-table") && (
                      <FormGroup className="form-group">
                        <span>Shape</span>
                        <input type="text" placeholder="Shape" value={enterShape} onChange={(e) => setEnterShape(e.target.value)} required />
                      </FormGroup>
                    )}
                    {(enterCategory === "sofa" || enterCategory === "bed") && (
                      <FormGroup className="form-group">
                        <span>Style</span>
                        <input type="text" placeholder="Style" value={enterStyle} onChange={(e) => setEnterStyle(e.target.value)} required />
                      </FormGroup>
                    )}
                    {(enterCategory === "sofa" || enterCategory === "dining-table" || enterCategory === "chair" || enterCategory === "TV-unit") && (
                      <FormGroup className="form-group">
                        <span>Features</span>
                        <input type="text" placeholder="Feature" value={enterFeatures} onChange={(e) => setEnterFeatures(e.target.value)} required />
                      </FormGroup>
                    )}
                    {(enterCategory === "sofa" || enterCategory === "bed" || enterCategory === "TV-unit" || enterCategory === "book-shleves" || enterCategory === "wardrobe" || enterCategory === "Chair") && (
                      <FormGroup className="form-group">
                        <span>Product Quantity</span>
                        <input type="text" placeholder="Product Quantity" value={enterProductQuantity} onChange={(e) => setEnterProductQuantity(e.target.value)} required />
                      </FormGroup>
                    )}
                    {(enterCategory === "sofa" || enterCategory === "chair") && (
                      <FormGroup className="form-group">
                        <span>Armrest</span>
                        <input type="text" placeholder="Armrest" value={enterArmrest} onChange={(e) => setEnterArmrest(e.target.value)} required />
                      </FormGroup>
                    )}
                    {(enterCategory === "bed") && (
                      <FormGroup className="form-group">
                        <span>Size</span>
                        <input type="text" placeholder="Size" value={enterSize} onChange={(e) => setEnterSize(e.target.value)} required />
                      </FormGroup>
                    )}
                    {(enterCategory === "bed" || enterCategory === "dining-table" || enterCategory === "TV-unit") && (
                      <FormGroup className="form-group">
                        <span>Product Weight</span>
                        <input type="text" placeholder="Product Weight" value={enterProductWeight} onChange={(e) => setEnterProductWeight(e.target.value)} required />
                      </FormGroup>
                    )}
                    {(enterCategory === "dining-table") && (
                      <FormGroup className="form-group">
                        <span>Table Top Material</span>
                        <input type="text" placeholder="Table Top Material" value={enterTableTopMaterial} onChange={(e) => setEnterTableTopMaterial(e.target.value)} required />
                      </FormGroup>
                    )}
                    {(enterCategory === "dining-table") && (
                      <FormGroup className="form-group">
                        <span>Chair Dimension</span>
                        <input type="text" placeholder="Chair Dimension" value={enterChairDimension} onChange={(e) => setEnterChairDimension(e.target.value)} required />
                      </FormGroup>
                    )}
                    {(enterCategory === "dining-table") && (
                      <FormGroup className="form-group">
                        <span>Upholstery Fabric</span>
                        <input type="text" placeholder="Upholstery Fabric" value={enterUpholsteryfabric} onChange={(e) => setEnterUpholsteryFabric(e.target.value)} required />
                      </FormGroup>
                    )}
                    {(enterCategory === "TV-unit") && (
                      <FormGroup className="form-group">
                        <span>Recommended Screen Size</span>
                        <input type="text" placeholder="Recommended Screen Size" value={enterRecommendedScreenSize} onChange={(e) => setEnterRecommendedScreenSize(e.target.value)} required />
                      </FormGroup>
                    )}
                    {(enterCategory === "TV-unit") && (
                      <FormGroup className="form-group">
                        <span>Number of Drawers</span>
                        <input type="text" placeholder="Number of Drawers" value={enterNumberOfDrawers} onChange={(e) => setEnterNumberOfDrawers(e.target.value)} required />
                      </FormGroup>
                    )}
                    {(enterCategory === "TV-unit") && (
                      <FormGroup className="form-group">
                        <span>Wall Mounting</span>
                        <input type="text" placeholder="Wall Mounting" value={enterWallMounting} onChange={(e) => setEnterWallMounting(e.target.value)} required />
                      </FormGroup>
                    )}
                    {(enterCategory === "book-shleves") && (
                      <FormGroup className="form-group">
                        <span>Number of Shleves</span>
                        <input type="text" placeholder="Number of Shleves" value={enterNumberOfShleves} onChange={(e) => setEnterNumberOfShleves(e.target.value)} required />
                      </FormGroup>
                    )}
                    {(enterCategory === "wardrobe") && (
                      <FormGroup className="form-group">
                        <span>Lock</span>
                        <input type="text" placeholder="Lock" value={enterLock} onChange={(e) => setEnterLock(e.target.value)} required />
                      </FormGroup>
                    )}
                    {(enterCategory === "wardrobe") && (
                      <FormGroup className="form-group">
                        <span>Mirror</span>
                        <input type="text" placeholder="Mirror" value={enterMirror} onChange={(e) => setEnterMirror(e.target.value)} required />
                      </FormGroup>
                    )}
                    {(enterCategory === "wardrobe") && (
                      <FormGroup className="form-group">
                        <span>Number of Doors</span>
                        <input type="text" placeholder="Number of Doors" value={enterNumberOfDoors} onChange={(e) => setEnterNumberOfDoors(e.target.value)} required />
                      </FormGroup>
                    )}
                    {(enterCategory === "chair") && (
                      <FormGroup className="form-group">
                        <span>Backrest</span>
                        <input type="text" placeholder="Backrest" value={enterBackrest} onChange={(e) => setEnterBackrest(e.target.value)} required />
                      </FormGroup>
                    )}
                    {(enterCategory === "chair") && (
                      <FormGroup className="form-group">
                        <span>Upholstery Material</span>
                        <input type="text" placeholder="Upholstery Material" value={enterUpholsteryMaterial} onChange={(e) => setEnterUpholsteryMaterial(e.target.value)} required />
                      </FormGroup>
                    )}
                    {(enterCategory === "chair") && (
                      <FormGroup className="form-group">
                        <span>GSM</span>
                        <input type="text" placeholder="GSM" value={enterGSM} onChange={(e) => setEnterGSM(e.target.value)} required />
                      </FormGroup>
                    )}
                    {(enterCategory === "chair") && (
                      <FormGroup className="form-group">
                        <span>Content</span>
                        <input type="text" placeholder="Content" value={enterContent} onChange={(e) => setEnterContent(e.target.value)} required />
                      </FormGroup>
                    )}

                    <FormGroup className="form-group">
                      <span>Warranty</span>
                      <input type="text" placeholder="Warranty" value={enterWarranty} onChange={(e) => setEnterWarranty(e.target.value)} required />
                    </FormGroup>
                    <FormGroup className="form-group">
                      <span>Brand</span>
                      <input type="text" placeholder="Brand" value={enterBrand} onChange={(e) => setEnterBrand(e.target.value)} required />
                    </FormGroup>
                    <FormGroup className="form-group">
                      <span>Ships In</span>
                      <input type="text" placeholder="Ships In" value={enterShipsIn} onChange={(e) => setEnterShipsIn(e.target.value)} required />
                    </FormGroup>
                    <FormGroup className="form-group">
                      <span>Delivery Condition</span>
                      <input type="text" placeholder="Delivery Condition" value={enterDeliveryCondition} onChange={(e) => setEnterDeliveryCondition(e.target.value)} required />
                    </FormGroup>
                  </div>

                  <button className="buy_btn" type="submit">
                    Add Product
                  </button>
                </Form>
              </>
            }
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default AddProducts;
