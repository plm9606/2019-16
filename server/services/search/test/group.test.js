const client = require("../elastic/client");
const {
  searchStudyGroup,
  searchStudyGroupWithCategory,
  tagStudyGroup,
  searchAllStudyGroup,
  searchAllStudyGroupWithCategory,
  bulkStudyGroups
} = require("../elastic/group");

const testGroups = [
  {
    _id: "111",
    title: "test_study",
    subtitle: "subtitle1",
    intro: "intro1",
    isRecruiting: true,
    category: ["프로그래밍", "파이썬", "test_group"],
    tags: ["알고리즘 ", "파이썬 ", "python ", "algorithm"],
    days: [0, 4],
    leader: "test1@gmail.com",
    startTime: 17,
    min_personnel: 4,
    max_personnel: 8,
    location: { lat: 41.12, lon: -50.34 },
    endTime: 19,
    thumbnail:
      "https://kr.object.ncloudstorage.com/studycombined/groupImage/1575602565910algorith.png",
    members: []
  },
  {
    _id: "211",
    title: "test_study",
    subtitle: "subtitle2",
    intro: "intro2",
    isRecruiting: true,
    category: ["프로그래밍", "자바"],
    tags: ["알고리즘 ", "java ", "자바 ", "algorithm", "test_study"],
    days: [0, 4],
    leader: "test1@gmail.com",
    startTime: 17,
    min_personnel: 4,
    max_personnel: 8,
    location: { lat: 41.12, lon: -50.34 },
    endTime: 19,
    thumbnail:
      "https://kr.object.ncloudstorage.com/studycombined/groupImage/1575602565910algorith.png",
    members: []
  }
];

const ADD_testGroups = [
  `{"_id":"111", "title": "test_study", "subtitle": "subtitle1", "intro" : "intro1", "isRecruiting" : true, "category" : [ "프로그래밍", "파이썬","test_group"] , "tags" : ["알고리즘 ","파이썬 ","python ","algorithm"],"days" : [0, 4], "leader" : "test1@gmail.com", "startTime" : 17, "min_personnel" : 4, "max_personnel" : 8, "location" : { "lat" : 41.12, "lon" : -50.34 },"endTime" : 19,"thumbnail" : "https://kr.object.ncloudstorage.com/studycombined/groupImage/1575602565910algorith.png","members" : [ ]}`,
  `{"_id":"211", "title": "test_study", "subtitle": "subtitle2", "intro" : "intro2", "isRecruiting" : true, "category" : [ "프로그래밍", "자바"], "tags" : ["알고리즘 ","java ","자바 ","algorithm","test_study"],"days" : [0, 4], "leader" : "test1@gmail.com", "startTime" : 17, "min_personnel" : 4, "max_personnel" : 8, "location" : { "lat" : 41.12, "lon" : -50.34 },"endTime" : 19,"thumbnail" : "https://kr.object.ncloudstorage.com/studycombined/groupImage/1575602565910algorith.png","members" : [ ]}`
];

const UPDATE_testGroups = [
  `{"_id":"111", "title": "update", "subtitle": "update", "intro" : "update", "isRecruiting" : true, "category" : [ "프로그래밍", "파이썬"] , "tags" : ["알고리즘 ","파이썬 ","python ","algorithm"],"days" : [0, 4], "leader" : "test1@gmail.com", "startTime" : 17, "min_personnel" : 4, "max_personnel" : 8, "location" : { "lat" : 41.12, "lon" : -50.34 },"endTime" : 19,"thumbnail" : "https://kr.object.ncloudstorage.com/studycombined/groupImage/1575602565910algorith.png","members" : [ ]}`
];

const REMOVE_testGroups = [
  `{"_id":"211", "title": "test_study", "subtitle": "subtitle2", "intro" : "intro2", "isRecruiting" : true, "category" : [ "프로그래밍", "자바"], "tags" : ["알고리즘 ","java ","자바 ","algorithm"],"days" : [0, 4], "leader" : "test1@gmail.com", "startTime" : 17, "min_personnel" : 4, "max_personnel" : 8, "location" : { "lat" : 41.12, "lon" : -50.34 },"endTime" : 19,"thumbnail" : "https://kr.object.ncloudstorage.com/studycombined/groupImage/1575602565910algorith.png","members" : [ ]}`
];

const initializeElastic = async () => {
  await bulkStudyGroups(ADD_testGroups, [], []);
};

const clearElastic = async () => {
  await client.delete({ index: "studygroup", id: 111 });
  await client.delete({ index: "studygroup", id: 211 });
};

beforeAll(async () => {
  return await initializeElastic();
});

afterAll(async () => {
  return await clearElastic();
});

/**
 * searchStudyGroup
 */
test("특정스터디그룹을_검색한다(searchStudyGroup)", async () => {
  const result = await searchStudyGroup({
    searchWord: "test_study",
    lat: "41.12",
    lon: "-50.34",
    page: 0,
    isRecruit: true
  });

  expect(result).toEqual([testGroups[1], testGroups[0]]);
});

/**
 * searchStudyGroupWithCategory
 */
test("카테고리로_스터디그룹을_검색한다(searchStudyGroupWithCategory)", async () => {
  const result = await searchStudyGroupWithCategory({
    searchWord: "test_study",
    category: "파이썬",
    lat: "41.12",
    lon: "-50.34",
    page: 0,
    isRecruit: true
  });

  expect(result).toEqual([testGroups[0]]);
});

test("특정_태그를_가진_스터디그룹을_검색한다(tagStudyGroup)", async () => {
  const result = await tagStudyGroup({
    tags: ["test_study"],
    lat: "41.12",
    lon: "-50.34",
    page: 0,
    isRecruit: true
  });

  expect(result).toEqual([testGroups[1]]);
});

test("위치내에있는_모든_스터디그룹을_검색한다(searchAllStudyGroup)", async () => {
  const result = await searchAllStudyGroup({
    lat: "41.12",
    lon: "-50.34",
    page: 0,
    isRecruit: true
  });

  expect(result.length).toBeGreaterThan(2);
});

test("카테고리를_포함하는_모든_그룹을_검색한다(searchAllStudyGroupWithCategory)", async () => {
  const result = await searchAllStudyGroupWithCategory({
    category: "test_group",
    lat: "41.12",
    lon: "-50.34",
    page: 0,
    isRecruit: true
  });

  expect(result).toEqual([testGroups[0]]);
});
