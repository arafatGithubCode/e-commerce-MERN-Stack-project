const setAccessTokenCookie = (res, accessToken) => {
  try {
    res.cookie("accessToken", accessToken, {
      maxAge: 15 * 60 * 1000, // 15 minutes
      secure: true,
      httpOnly: true,
      sameSite: "none",
    });
  } catch (error) {
    throw error;
  }
};

const setRefreshTokenCookie = (res, refreshToken) => {
  try {
    res.cookie("refreshToken", refreshToken, {
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      secure: true,
      httpOnly: true,
      sameSite: "none",
    });
  } catch (error) {
    throw error;
  }
};

module.exports = { setAccessTokenCookie, setRefreshTokenCookie };
